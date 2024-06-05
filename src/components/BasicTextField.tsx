import { Box, TextField } from '@mui/material/'

import { ChangeEvent } from 'react'

interface TextFieldProps {
  value: string | number | undefined
  type: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function BasicTextField({ value, type, onChange }: TextFieldProps) {
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
