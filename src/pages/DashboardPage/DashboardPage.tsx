import { DashboardGrid } from './components/DashboardGrid'
import { Button } from '../../components/ui/button'
import { Bot, MoonStar, Sun } from 'lucide-react'
import { useThemeMode } from '../../hooks/useThemeMode'
import { useRobotSSE } from '../../hooks/useRobotSSE'
import { Footer } from '../../components/Footer'

export function DashboardPage() {
  const theme = useThemeMode()
  const robot = useRobotSSE()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-4 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-600 text-white shadow-sm">
            <Bot className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-lg font-extrabold tracking-tight sm:text-xl">
              Célula Robótica - Separação de Cores
            </div>
            <div className="truncate text-sm text-slate-500 dark:text-slate-400">
              Supervisão Industrial
            </div>
          </div>

          <Button
            aria-label="Alternar modo claro/escuro"
            size="icon"
            onClick={theme.toggle}
            title={theme.mode === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme.mode === 'dark' ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5">
        <DashboardGrid />
      </main>

      {/* Footer */}
      <Footer themeLabel={theme.mode === 'dark' ? 'Escuro' : 'Claro'} connected={robot.connected} />
    </div>
  )
}
