import { Separator } from './ui/separator'

type Props = {
  themeLabel: string
  connected: boolean
}

export function Footer({ themeLabel, connected }: Props) {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className={[
                'h-2.5 w-2.5 rounded-full',
                connected ? 'bg-emerald-500' : 'bg-amber-500',
              ].join(' ')}
              aria-hidden
            />
            <span className="text-sm font-extrabold tracking-wide text-slate-700 dark:text-slate-200">
              {connected ? 'CONECTADO' : 'ATENÇÃO'}
            </span>
            <Separator className="hidden h-5 w-px sm:block" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {connected ? 'Recebendo dados da célula.' : 'Aguardando dados da célula (API).'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              API Node-RED
            </span>
            <span
              className={[
                'inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-extrabold',
                connected
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
              ].join(' ')}
            >
              <span
                className={[
                  'h-2 w-2 rounded-full',
                  connected ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600',
                ].join(' ')}
                aria-hidden
              />
              {connected ? 'CONECTADO' : 'DESCONHECIDO'}
            </span>
            <Separator className="hidden h-5 w-px sm:block" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Tema: {themeLabel}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
