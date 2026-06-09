import { useState } from 'react'
import type { GameConfig, Phase, Player, Winner, WordEntry } from './types'
import { createPlayers, checkWinner } from './game/logic'
import { pickRandomWord } from './data/words'
import HomeScreen from './screens/HomeScreen'
import SetupScreen from './screens/SetupScreen'
import RevealScreen from './screens/RevealScreen'
import DiscussionScreen from './screens/DiscussionScreen'
import VotingScreen from './screens/VotingScreen'
import RoundResultScreen from './screens/RoundResultScreen'
import GameOverScreen from './screens/GameOverScreen'

type NoElimReason = 'tie' | 'skip'

export default function App() {
  const [phase, setPhase] = useState<Phase>('home')
  const [config, setConfig] = useState<GameConfig | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [word, setWord] = useState<WordEntry | null>(null)
  const [lastEliminated, setLastEliminated] = useState<Player | null>(null)
  const [noElimReason, setNoElimReason] = useState<NoElimReason | null>(null)
  const [winner, setWinner] = useState<Winner | null>(null)
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
    setPhase('discussion')
  }

  function startGame(cfg: GameConfig) {
    const newPlayers = createPlayers(cfg.names, cfg.impostorCount)
    setConfig(cfg)
    setPlayers(newPlayers)
    setWord(pickRandomWord(cfg.categories))
    setLastEliminated(null)
    setNoElimReason(null)
    setWinner(null)
    setStarterId(null)
    setRound(0)
    setPhase('reveal')
  }

  function eliminate(playerId: number) {
    const updated = players.map((p) =>
      p.id === playerId ? { ...p, alive: false } : p,
    )
    setPlayers(updated)
    setLastEliminated(updated.find((p) => p.id === playerId) ?? null)
    setNoElimReason(null)
    setWinner(checkWinner(updated))
    setPhase('roundResult')
  }

  function resolveNoElimination(reason: NoElimReason) {
    setLastEliminated(null)
    setNoElimReason(reason)
    setWinner(null)
    setPhase('roundResult')
  }

  function continueAfterResult() {
    if (winner) setPhase('gameover')
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
    setPhase('setup')
  }

  function backToHome() {
    resetAll()
    setPhase('home')
  }

  switch (phase) {
    case 'home':
      return <HomeScreen onNew={() => setPhase('setup')} />

    case 'setup':
      return <SetupScreen onStart={startGame} onBack={backToHome} />

    case 'reveal':
      return (
        <RevealScreen
          players={players}
          word={word!}
          hintMode={config!.hintMode}
          onDone={() => goToDiscussion()}
        />
      )

    case 'discussion':
      return (
        <DiscussionScreen
          key={round}
          players={players}
          starterId={starterId}
          durationSeconds={config!.discussionSeconds}
          onVote={() => setPhase('voting')}
        />
      )

    case 'voting':
      return (
        <VotingScreen
          players={players}
          onEliminate={eliminate}
          onTie={() => resolveNoElimination('tie')}
          onSkip={() => resolveNoElimination('skip')}
        />
      )

    case 'roundResult':
      return (
        <RoundResultScreen
          eliminated={lastEliminated}
          noElimReason={noElimReason}
          remainingImpostors={players.filter((p) => p.alive && p.isImpostor).length}
          onContinue={continueAfterResult}
        />
      )

    case 'gameover':
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
