import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3001/events'
const MAX_LOG_HISTORY = 5

export type RobotSSELogEntry = {
  time: string
  message: string
}

export type RobotSSEData = {
  status_robo?: string
  timestamp?: string
  raw_bits?: boolean[]

  // legado (payload antigo)
  total_pecas?: number
  total_ciclos?: number
  taxa_acerto?: string
  ultimo_log?: string
}

function logTimeFromPayload(p: RobotSSEData): string {
  if (p.timestamp) return p.timestamp
  if (p.ultimo_log) {
    const ms = Number(p.ultimo_log)
    if (Number.isFinite(ms)) {
      const d = new Date(ms)
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }
    }
    return p.ultimo_log
  }
  return '—'
}

function logMessageFromPayload(p: RobotSSEData): string {
  if (p.status_robo) return p.status_robo
  return 'Atualização recebida'
}

export function useRobotSSE() {
  const [data, setData] = useState<RobotSSEData | null>(null)
  const [logHistory, setLogHistory] = useState<RobotSSELogEntry[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const source = new EventSource(API_URL)

    source.onopen = () => {
      setConnected(true)
      console.log('[SSE] Conectado')
    }

    source.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data) as RobotSSEData
        console.log('[SSE] Dados:', parsed)
        setData(parsed)
        setLogHistory((prev) => {
          const entry: RobotSSELogEntry = {
            time: logTimeFromPayload(parsed),
            message: logMessageFromPayload(parsed),
          }
          return [...prev, entry].slice(-MAX_LOG_HISTORY)
        })
      } catch (err) {
        console.warn('[SSE] JSON inválido:', e.data, err)
      }
    }

    source.onerror = () => {
      setConnected(false)
      console.warn('[SSE] Desconectado')
    }

    return () => source.close()
  }, [])

  return { data, connected, logHistory }
}
