import { useState } from 'react'
import { createPlayers, checkWinner } from './game/logic'
import { saveSetup } from './game/storage'
import { pickRandomWord } from './common/data/words'
import { Phase } from './common/enums/phase.enum'
import { GameConfig } from './common/interfaces/game-config'
import { Player } from './common/interfaces/player.interface'
import { WordEntry } from './common/interfaces/word-entry.interface'
import { Team } from './common/enums/team.enum'
import HomeScreen from './screens/home/home'
import SetupScreen from './screens/setup/setup'
import RevealScreen from './screens/reveal/reveal'
import DiscussionScreen from './screens/discussion/discussion'
import VotingScreen from './screens/voting/voting'
import GameOverScreen from './screens/game-over/game-over'
import RoundResultScreen from './screens/round-result/round-result'


type NoElimReason = 'tie' | 'skip'

export default function App() {
  const [phase, setPhase] = useState<Phase>(Phase.HOME)
  const [config, setConfig] = useState<GameConfig | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [word, setWord] = useState<WordEntry | null>(null)
  const [lastEliminated, setLastEliminated] = useState<Player | null>(null)
  const [noElimReason, setNoElimReason] = useState<NoElimReason | null>(null)
  const [winner, setWinner] = useState<Team | null>(null)
  const [starterId, setStarterId] = useState<number | null>(null)
  const [round, setRound] = useState(0)

  /** Sorteia quem abre a discussão entre os jogadores vivos. */
  function pickStarter(list: Player[]): number | null {
    const alive = list.filter((p) => p.alive)
    if (!alive.length) return null
    return alive[Math.floor(Math.random() * alive.length)].id
  }

  function goToDiscussion(list = players) {
    setStarterId(pickStarter(list))
    setLastEliminated(null)
    setNoElimReason(null)
    setRound((r) => r + 1)
    setPhase(Phase.DISCUSSION)
  }

  function startGame(cfg: GameConfig) {
    saveSetup(cfg)
    const newPlayers = createPlayers(cfg.names, cfg.impostorCount)
    setConfig(cfg)
    setPlayers(newPlayers)
    setWord(pickRandomWord(cfg.categories))
    setLastEliminated(null)
    setNoElimReason(null)
    setWinner(null)
    setStarterId(null)
    setRound(0)
    setPhase(Phase.REVEAL)
  }

  function eliminate(playerId: number) {
    const updated = players.map((p) =>
      p.id === playerId ? { ...p, alive: false } : p,
    )
    setPlayers(updated)
    setLastEliminated(updated.find((p) => p.id === playerId) ?? null)
    setNoElimReason(null)
    setWinner(checkWinner(updated))
    setPhase(Phase.ROUND_RESULT)
  }

  function resolveNoElimination(reason: NoElimReason) {
    setLastEliminated(null)
    setNoElimReason(reason)
    setWinner(null)
    setPhase(Phase.ROUND_RESULT)
  }

  function continueAfterResult() {
    if (winner) setPhase(Phase.GAME_OVER)
    else goToDiscussion()
  }

  function playAgain() {
    if (!config) return
    startGame(config)
  }

  function resetAll() {
    setConfig(null)
    setPlayers([])
    setWord(null)
    setLastEliminated(null)
    setNoElimReason(null)
    setWinner(null)
    setStarterId(null)
  }

  function newSetup() {
    resetAll()
    setPhase(Phase.SETUP)
  }

  function backToHome() {
    resetAll()
    setPhase(Phase.HOME)
  }

  switch (phase) {
    case Phase.HOME:
      return <HomeScreen onNew={() => setPhase(Phase.SETUP)} />

    case Phase.SETUP:
      return <SetupScreen onStart={startGame} onBack={backToHome} />

    case Phase.REVEAL:
      return (
        <RevealScreen
          players={players}
          word={word!}
          hintMode={config!.hintMode}
          onDone={() => goToDiscussion()}
        />
      )

    case Phase.DISCUSSION:
      return (
        <DiscussionScreen
          key={round}
          players={players}
          starterId={starterId}
          durationSeconds={config!.discussionSeconds}
          onVote={() => setPhase(Phase.VOTING)}
        />
      )

    case Phase.VOTING:
      return (
        <VotingScreen
          mode={config!.voteMode}
          players={players}
          onEliminate={eliminate}
          onTie={() => resolveNoElimination('tie')}
          onSkip={() => resolveNoElimination('skip')}
        />
      )

    case Phase.ROUND_RESULT:
      return (
        <RoundResultScreen
          eliminated={lastEliminated}
          noElimReason={noElimReason}
          remainingImpostors={players.filter((p) => p.alive && p.isImpostor).length}
          onContinue={continueAfterResult}
        />
      )

    case Phase.GAME_OVER:
      return (
        <GameOverScreen
          winner={winner!}
          players={players}
          word={word!}
          onPlayAgain={playAgain}
          onNewSetup={newSetup}
        />
      )
  }
}
