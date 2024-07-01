import { Alert, Snackbar } from '@mui/material'

export type Severity = 'error' | 'info' | 'success' | 'warning'

interface AlertProps {
  isPerdas?: boolean
  severity?: Severity
  open: boolean
  onClose?: () => void
}

export function AlertComponent({
  severity,
  open,
  onClose,
  isPerdas = false,
}: AlertProps) {
  function handleSeverity(severity: Severity | undefined) {
    switch (severity) {
      case 'success':
        return 'Dados cadastrados com sucesso'
      case 'error':
        return 'Erro ao cadastrar dados'
      case 'warning':
        if (isPerdas) {
          return 'Mês em destaque não possui dados de perdas'
        }
        break

      default:
        break
    }
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!isPerdas && severity === 'warning' ? false : open}
      TransitionProps={{
        timeout: {
          enter: 1000, // Define a duração da transição de entrada (em milissegundos)
          exit: 1000, // Define a duração da transição de saída (em milissegundos)
        },
      }}
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        {' '}
        {handleSeverity(severity)}
      </Alert>
    </Snackbar>
  )
}
