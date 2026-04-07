import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Separator } from '../../../components/ui/separator'

export type RobotLogItem = {
  time: string
  message: string
}

type Props = {
  logs?: RobotLogItem[]
}

export function RightPanel({ logs = [] }: Props) {
  return (
    <div className="grid gap-4 xl:sticky xl:top-[80px]">
      <Card>
        <CardHeader>
          <CardTitle>KPIs de Produção</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-slate-500 dark:text-slate-400">OEE da Célula</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Disponibilidade Mecânica</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs do Robô</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator />
          {logs.length ? (
            <div className="mt-3 space-y-2">
              {logs.map((l, idx) => (
                <div key={`${l.time}-${idx}`} className="flex gap-3">
                  <span className="w-14 shrink-0 text-sm text-slate-400 dark:text-slate-500">
                    {l.time}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {l.message}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Sem logs no momento.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
