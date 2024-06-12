import { ChangeEvent } from 'react'
import { capitalizeFirstLetters } from '../services/api'

interface SelectProps {
  id: string
  value: string
  options: Array<string>
  className?: string
  disabledOptions?: number
  reverse?: true
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function Select({
  options,
  value = 'Selecione',
  onChange,
  reverse,
  disabledOptions = 100,
  className,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`focus-visible: rounded-xl bg-aliceblue-500 text-center text-bluesr-500 outline-bluesr-500 ${className}`}
    >
      <option value="Selecione">Selecione</option>
      {options.map((option, index) => (
        <option
          key={option}
          className="disabled:text-gray-400"
          value={option}
          disabled={
            reverse ? index <= disabledOptions : index > disabledOptions
          }
        >
          {capitalizeFirstLetters(option)}
        </option>
      ))}
    </select>
  )
}
