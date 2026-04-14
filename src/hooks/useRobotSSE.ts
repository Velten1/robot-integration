import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3001/events'
const MAX_LOG_HISTORY = 5

export type RobotSSELogEntry = {
  time: string
  message: string
}

export type RobotSSEData = {
  status_robo?: string
  estado?: string
  timestamp?: string
  raw_bits?: boolean[]

  // legado (payload antigo)
  total_pecas?: number
  total_ciclos?: number
  taxa_acerto?: string
  ultimo_log?: string
}

function estadoFromBits(bits?: boolean[]): string {
  const b = Array.isArray(bits) ? bits : []
  const home = !!b[0]
  const sleep = !!b[1]
  const emMovimento = !!b[2]
  const rampa1 = !!b[3]
  const rampa2 = !!b[4]
  const rampa3 = !!b[5]

  // Prioridade: movimentos específicos > movimento genérico > estados estáveis
  if (rampa1) return 'movimento da rampa 1'
  if (rampa2) return 'movimento da rampa 2'
  if (rampa3) return 'movimento da rampa 3'
  if (emMovimento) return 'em movimento'
  if (home) return 'home'
  if (sleep) return 'sleep'
  return 'indefinido'
}

function normalizePayload(raw: unknown): RobotSSEData | null {
  // Às vezes o Node-RED pode mandar só o array de bits
  if (Array.isArray(raw)) {
    if (raw.every((x) => typeof x === 'boolean')) {
      return { raw_bits: raw as boolean[] }
    }
    return { raw_bits: raw.map(Boolean) as boolean[] }
  }

  if (raw && typeof raw === 'object') {
    return raw as RobotSSEData
  }

  return null
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
  if (p.estado) return p.estado
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
        const decoded = JSON.parse(e.data) as unknown
        const parsed = normalizePayload(decoded)
        if (!parsed) return

        const enriched: RobotSSEData = {
          ...parsed,
          estado: parsed.estado ?? parsed.status_robo ?? estadoFromBits(parsed.raw_bits),
        }

        console.log('[SSE] Dados:', enriched)
        setData(enriched)
        setLogHistory((prev) => {
          const entry: RobotSSELogEntry = {
            time: logTimeFromPayload(enriched),
            message: logMessageFromPayload(enriched),
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
