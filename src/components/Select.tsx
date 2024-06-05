import { capitalize } from 'lodash'
import { ChangeEvent } from 'react'

interface SelectProps {
  id: string
  value: string
  options: Array<string>
  className?: string
  disabledOptions?: number
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function Select({
  options,
  value,
  onChange,
  disabledOptions = 12,
  className,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`focus-visible: rounded-xl text-center text-bluesr-500 outline-bluesr-500 ${className}`}
    >
      {options.map((option, index) => (
        <option
          key={option}
          className=""
          value={option}
          disabled={index >= disabledOptions}
        >
          {capitalize(option)}
        </option>
      ))}
    </select>
  )
}
