import { Box } from '@mui/material/'
import TextField from '@mui/material/TextField'
import { ChangeEvent } from 'react'

interface TextFieldProps {
  value: string
  type: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export function BasicTextField({ value, type, onChange }: TextFieldProps) {
  function setPlaceholder(type: string) {
    if (type === 'password') {
      return 'Senha'
    } else {
      return 'Email'
    }
  }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20rem' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={type}
        onChange={onChange}
        value={value}
        type={type}
        label={setPlaceholder(type)}
        variant="outlined"
        color="bluesr-400"
      />
    </Box>
  )
}
