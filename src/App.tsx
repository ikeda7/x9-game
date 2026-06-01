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

export default function App() {
  const [phase, setPhase] = useState<Phase>('home')
  const [config, setConfig] = useState<GameConfig | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [word, setWord] = useState<WordEntry | null>(null)
  const [lastEliminated, setLastEliminated] = useState<Player | null>(null)
  const [winner, setWinner] = useState<Winner | null>(null)

  function startGame(cfg: GameConfig) {
    setConfig(cfg)
    setPlayers(createPlayers(cfg.names, cfg.impostorCount))
    setWord(pickRandomWord())
    setLastEliminated(null)
    setWinner(null)
    setPhase('reveal')
  }

  function eliminate(playerId: number) {
    const updated = players.map((p) =>
      p.id === playerId ? { ...p, alive: false } : p,
    )
    setPlayers(updated)
    setLastEliminated(updated.find((p) => p.id === playerId) ?? null)
    setWinner(checkWinner(updated))
    setPhase('roundResult')
  }

  function continueAfterResult() {
    setPhase(winner ? 'gameover' : 'discussion')
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
    setWinner(null)
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
          onDone={() => setPhase('discussion')}
        />
      )

    case 'discussion':
      return <DiscussionScreen players={players} onVote={() => setPhase('voting')} />

    case 'voting':
      return (
        <VotingScreen
          players={players}
          onEliminate={eliminate}
          onSkip={() => setPhase('discussion')}
        />
      )

    case 'roundResult':
      return (
        <RoundResultScreen
          eliminated={lastEliminated!}
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
