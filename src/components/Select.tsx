import { capitalize } from "lodash"
import { ChangeEvent } from "react"

interface SelectProps{
    id: string,
    value: string,
    options: Array<string>
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function Select({options, value, onChange}: SelectProps){
    return(
        <select
          value={value}
          onChange={onChange}
          className="text-bluesr-500 rounded-xl text-center focus-visible: outline-bluesr-500"
        >
          {options.map((option) => (
            <option key={option} className="" value={option}>
              {capitalize(option)}
            </option>
          ))}
        </select>
    )
}