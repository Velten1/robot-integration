import { Badge } from '../../../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

function StatusDot({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={[
          'h-14 w-14 rounded-full border-[3px]',
          'bg-white dark:bg-slate-950',
          active ? 'border-sky-500' : 'border-slate-200 dark:border-slate-700',
        ].join(' ')}
      />
      <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  )
}

type Props = {
  status?: string
  rawBits?: boolean[]
}

export function CellSchematicCard({ status, rawBits }: Props): JSX.Element {
  const bits = rawBits ?? []
  const bit = (idx: number) => Boolean(bits[idx])
  const transporteAtivo = bit(2) || bit(3) || bit(4) || bit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>ESQUEMÁTICO DA CÉLULA</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Área de vídeo / esquemático */}
        <div className="grid h-[340px] place-items-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 sm:h-[380px]">
          <div className="flex flex-col items-center gap-2">
            <Badge variant="outline">{status || 'EM OPERAÇÃO'}</Badge>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Vídeo / esquemático aqui
            </span>
          </div>
        </div>

        {/* Separação de cores */}
        <div className="mt-5 flex flex-col items-center gap-4">
          <span className="text-xl text-slate-300 dark:text-slate-700">⇩</span>

          <div className="flex flex-wrap justify-center gap-8">
            <StatusDot label="PRETO" active={bit(0)} />
            <StatusDot label="VERMELHO" active={bit(1)} />
            <StatusDot label="CINZA" active={bit(2)} />
          </div>
        </div>

        {/* Status do sistema */}
        <div className="mt-5 flex flex-wrap justify-center gap-12">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Transporte
            </div>
            <div className="mt-1 text-base font-extrabold text-slate-800 dark:text-slate-100">
              {transporteAtivo ? 'ATIVO' : 'INATIVO'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Alimentação
            </div>
            <div className="mt-1 text-base font-extrabold text-slate-800 dark:text-slate-100">
              {bit(4) ? 'OK' : 'OFF'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
