import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Separator } from '../../../components/ui/separator'

type KpiLine = { label: string; value: string }

type Props = {
  title: string
  value: string
  unit?: string
  lines?: KpiLine[]
}

export function KpiCard({ title, value, unit, lines = [] }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-extrabold leading-none text-slate-900 dark:text-slate-50">
            {value || '—'}
          </span>
          {unit ? (
            <span className="text-lg font-bold text-slate-400 dark:text-slate-500">{unit}</span>
          ) : null}
        </div>

        {lines.length > 0 && (
          <div className="mt-4">
            <Separator />
            <div className="mt-3 space-y-2">
              {lines.map((l) => (
                <div key={l.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{l.label}</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {l.value || '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
