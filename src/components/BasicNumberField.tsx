import { NumericFormat } from 'react-number-format'
import { BasicTextField, TextFieldProps } from './BasicTextField'

export function BasicNumberField({
  value,
  onChange,
  disabled,
}: TextFieldProps) {
  return (
    <NumericFormat
      disabled={disabled}
      customInput={BasicTextField}
      type="text"
      value={value}
      onChange={onChange}
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
    />
  )
}
