import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3001/events'

export type RobotSSEData = {
  status_robo?: string
  total_pecas?: number
  total_ciclos?: number
  taxa_acerto?: string
  ultimo_log?: string
}

export function useRobotSSE() {
  const [data, setData] = useState<RobotSSEData | null>(null)
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

  return { data, connected }
}
