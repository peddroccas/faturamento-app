import { Box } from '@mui/material/'
import TextField from '@mui/material/TextField'

import { ChangeEvent } from 'react'

export interface TextFieldProps {
  value: string | number | undefined
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export function BasicTextField({
  value,
  type = 'value',
  onChange,
  disabled,
}: TextFieldProps) {
  function setPlaceholder(type: string) {
    switch (type) {
      case 'password':
        return 'Senha'
      case 'email':
        return 'Email'
      case 'number':
        return 'Número'
      case 'select':
        return 'Selecione'
      case 'value':
        return 'Valor'
      case 'text':
        return 'Valor'
      case 'dae':
        return 'Data'
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
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'bluesr-400',
              },
            },
            '&:hover:not(.Mui-focused)': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0C4B80',
              },
            },
          },
        }}
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
