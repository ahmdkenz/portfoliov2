import { useT } from '../../context/LanguageContext'

interface StatusChipProps {
  status: 'running' | 'completed'
}

export function StatusChip({ status }: StatusChipProps) {
  const { t } = useT()
  const isRunning = status === 'running'
  return (
    <span className={isRunning ? 'status status--run' : 'status status--done'}>
      <span className="d" />
      <span>{isRunning ? t('status.running') : t('status.completed')}</span>
    </span>
  )
}
