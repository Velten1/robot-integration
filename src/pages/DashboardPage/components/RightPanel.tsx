import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Separator } from '../../../components/ui/separator'

export function RightPanel() {
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
          <div className="mt-3 space-y-2">
            {[
              ['14:32', 'Ciclo de seleção: ATIVO'],
              ['14:23', 'Início do programa: AUTO_CYCLE'],
              ['13:22', 'Ciclo lento detectado (Δ+0.6s)'],
            ].map(([t, msg]) => (
              <div key={`${t}-${msg}`} className="flex gap-3">
                <span className="w-12 shrink-0 text-sm text-slate-400 dark:text-slate-500">
                  {t}
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {msg}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
