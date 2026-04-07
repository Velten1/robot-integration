import { Separator } from './ui/separator'

type Props = {
  themeLabel: string
}

export function Footer({ themeLabel }: Props) {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" aria-hidden />
            <span className="text-sm font-extrabold tracking-wide text-slate-700 dark:text-slate-200">
              ATENÇÃO
            </span>
            <Separator className="hidden h-5 w-px sm:block" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Aguardando dados da célula (API).
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              API Node-RED
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-extrabold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600" aria-hidden />
              DESCONHECIDO
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
