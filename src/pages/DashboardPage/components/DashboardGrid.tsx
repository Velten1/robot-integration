import { KpiCard } from './KpiCard'
import { CellSchematicCard as CellSchematicCardRaw } from './CellSchematicCard'
import { RightPanel } from './RightPanel'
import type { RobotSSEData, RobotSSELogEntry } from '../../../hooks/useRobotSSE'
import type { ComponentType } from 'react'

type Props = {
  robot?: RobotSSEData | null
  logs?: RobotSSELogEntry[]
}

const CellSchematicCard = CellSchematicCardRaw as unknown as ComponentType<{
  status?: string
  rawBits?: boolean[]
}>

function splitPercent(raw?: string) {
  if (!raw) return { value: '', unit: '' }
  const trimmed = raw.trim()
  if (trimmed.endsWith('%')) return { value: trimmed.slice(0, -1), unit: '%' }
  return { value: trimmed, unit: '' }
}

export function DashboardGrid({ robot, logs = [] }: Props) {
  const taxa = splitPercent(robot?.taxa_acerto)

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
              {
                label: 'Status',
                value: robot?.estado != null && robot.estado !== '' ? String(robot.estado) : '',
              },
            ]}
          />
        </div>
      </section>

      <section className="lg:col-span-8 xl:col-span-6">
        <CellSchematicCard status={robot?.estado ?? robot?.status_robo} rawBits={robot?.raw_bits} />
      </section>

      <aside className="lg:col-span-12 xl:col-span-3">
        <RightPanel logs={logs} />
      </aside>
    </div>
  )
}
