import { FormEvent } from 'react'
import { LoadingButton } from '@mui/lab/'
import {Box} from '@mui/material/'
import SendIcon from '@mui/icons-material/Send'

interface LoadingButtonProps {
  value: string
  loading: boolean
  onClick: (e: FormEvent) => void
}

export function LoadingButtonComponent({
  value,
  onClick,
  loading,
}: LoadingButtonProps) {
  return (
    <Box sx={{ '& > button': { m: 1 } }}>
      <LoadingButton
        size="large"
        onClick={onClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        color="bluesr-400"
      >
        <span>{value}</span>
      </LoadingButton>
    </Box>
  )
}
