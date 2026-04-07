import { cn } from '../../lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: Props) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold tracking-wide',
        variant === 'default'
          ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
          : 'border border-sky-400 text-sky-700 dark:border-sky-700 dark:text-sky-300',
        className,
      )}
      {...props}
    />
  )
}
