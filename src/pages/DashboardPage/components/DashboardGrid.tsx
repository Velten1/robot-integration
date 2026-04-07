import { KpiCard } from './KpiCard'
import { CellSchematicCard } from './CellSchematicCard'
import { RightPanel } from './RightPanel'

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <section className="lg:col-span-4 xl:col-span-3">
        <div className="grid gap-4">
          <KpiCard
            title="Peças processadas"
            value=""
            unit=""
            lines={[
              { label: 'Meta', value: '' },
              { label: 'Eficiência', value: '' },
              { label: 'Inventário', value: '' },
            ]}
          />
          <KpiCard
            title="Tempo de ciclo (s)"
            value=""
            unit=""
            lines={[
              { label: 'Min', value: '' },
              { label: 'Máx', value: '' },
              { label: 'Timer', value: '' },
            ]}
          />
          <KpiCard
            title="Taxa de acerto (%)"
            value=""
            unit=""
            lines={[{ label: 'task_all', value: '' }]}
          />
        </div>
      </section>

      <section className="lg:col-span-8 xl:col-span-6">
        <CellSchematicCard />
      </section>

      <aside className="lg:col-span-12 xl:col-span-3">
        <RightPanel />
      </aside>
    </div>
  )
}
