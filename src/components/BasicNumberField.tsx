import { NumericFormat } from 'react-number-format'
import { BasicTextField, TextFieldProps } from './BasicTextField'

export function BasicNumberField({
  value,
  onChange,
  borderColor,
}: TextFieldProps) {
  return (
    <NumericFormat
      customInput={BasicTextField}
      borderColor={borderColor}
      type="value"
      value={value}
      onChange={onChange}
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
    />
  )
}
