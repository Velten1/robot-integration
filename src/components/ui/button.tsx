import { cn } from '../../lib/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'default'
  size?: 'icon' | 'sm' | 'md'
}

export function Button({ className, variant = 'ghost', size = 'md', ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'default'
          ? 'bg-sky-600 text-white hover:bg-sky-700'
          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
        size === 'icon' ? 'h-9 w-9' : size === 'sm' ? 'h-8 px-3 text-sm' : 'h-9 px-4 text-sm',
        className,
      )}
      {...props}
    />
  )
}
