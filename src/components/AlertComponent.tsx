import { Alert, Snackbar } from '@mui/material'

export type Severity = 'error' | 'info' | 'success' | 'warning'

interface AlertProps {
  severity?: Severity
  open: boolean
  onClose?: () => void
}

export function AlertComponent({ severity, open, onClose }: AlertProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
    >
      <Alert severity={severity} onClose={onClose}>
        {' '}
        {severity === 'success'
          ? `Dados cadastrados com sucesso`
          : `Erro ao cadastrar dados`}
      </Alert>
    </Snackbar>
  )
}
