import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3001/events'

export function useRobotSSE() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const source = new EventSource(API_URL)

    source.onopen = () => {
      setConnected(true)
      console.log('[SSE] Conectado')
    }

    source.onmessage = (e) => {
      const parsed = JSON.parse(e.data)
      console.log('[SSE] Dados:', parsed)
      setData(parsed)
    }

    source.onerror = () => {
      setConnected(false)
      console.warn('[SSE] Desconectado')
    }

    return () => source.close()
  }, [])

  return { data, connected }
}
