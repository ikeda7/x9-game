import { useEffect, useRef, useState } from 'react'
import { timesUp } from '../../game/feedback'
import { Player } from '../../common/interfaces/player.interface'
import { UseDiscussionTimerResult } from './discussion.interface'

export function useDiscussionTimer(durationSeconds: number): UseDiscussionTimerResult {
  const [secs, setSecs] = useState(durationSeconds)
  const [running, setRunning] = useState(true)
  const ref = useRef<number | null>(null)
  const buzzed = useRef(false)

  useEffect(() => {
    if (!running) return
    ref.current = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => {
      if (ref.current) window.clearInterval(ref.current)
    }
  }, [running])

  useEffect(() => {
    if (secs === 0 && !buzzed.current) {
      buzzed.current = true
      setRunning(false)
      timesUp()
    }
  }, [secs])

  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  const done = secs === 0
  const warn = secs <= 30

  const toggle = () => {
    if (done) {
      buzzed.current = false
      setSecs(durationSeconds)
      setRunning(true)
    } else {
      setRunning((r) => !r)
    }
  }

  return { mm, ss, done, warn, running, toggle }
}

export function computePlayerOrder(players: Player[], starterId: number | null) {
  const alive = players.filter((p) => p.alive)
  const startIdx = Math.max(0, alive.findIndex((p) => p.id === starterId))
  const order = [...alive.slice(startIdx), ...alive.slice(0, startIdx)]
  const eliminated = players.filter((p) => !p.alive)
  return { order, eliminated, starterName: order[0]?.name }
}
