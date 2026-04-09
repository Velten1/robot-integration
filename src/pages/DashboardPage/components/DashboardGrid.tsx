import { KpiCard } from './KpiCard'
import { CellSchematicCard } from './CellSchematicCard'
import { RightPanel } from './RightPanel'
import type { RobotLogItem } from './RightPanel'
import type { RobotSSEData } from '../../../hooks/useRobotSSE'

type Props = {
  robot?: RobotSSEData | null
}

function splitPercent(raw?: string) {
  if (!raw) return { value: '', unit: '' }
  const trimmed = raw.trim()
  if (trimmed.endsWith('%')) return { value: trimmed.slice(0, -1), unit: '%' }
  return { value: trimmed, unit: '' }
}

function formatLogTime(raw?: string) {
  if (!raw) return '—'
  const ms = Number(raw)
  if (!Number.isFinite(ms)) return raw
  const d = new Date(ms)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function DashboardGrid({ robot }: Props) {
  const taxa = splitPercent(robot?.taxa_acerto)
  const logs: RobotLogItem[] = robot?.ultimo_log
    ? [
        {
          time: formatLogTime(robot.ultimo_log),
          message: robot?.status_robo ? `Status: ${robot.status_robo}` : 'Atualização recebida',
        },
      ]
    : []

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <section className="lg:col-span-4 xl:col-span-3">
        <div className="grid gap-4">
          <KpiCard
            title="Peças processadas"
            value={robot?.total_pecas != null ? String(robot.total_pecas) : ''}
            unit=""
            lines={[
              { label: 'Meta', value: '' },
              { label: 'Eficiência', value: '' },
              { label: 'Inventário', value: '' },
            ]}
          />
          <KpiCard
            title="Total de ciclos"
            value={robot?.total_ciclos != null ? String(robot.total_ciclos) : ''}
            unit="ciclos"
            lines={[
              { label: 'Min', value: '' },
              { label: 'Máx', value: '' },
              { label: 'Timer', value: '' },
            ]}
          />
          <KpiCard
            title="Taxa de acerto (%)"
            value={taxa.value}
            unit={taxa.unit}
            lines={[
              { label: 'Status', value: robot?.status_robo ? String(robot.status_robo) : '' },
            ]}
          />
        </div>
      </section>

      <section className="lg:col-span-8 xl:col-span-6">
        <CellSchematicCard />
      </section>

      <aside className="lg:col-span-12 xl:col-span-3">
        <RightPanel logs={logs} />
      </aside>
    </div>
  )
}
