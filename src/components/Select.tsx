import { capitalize } from "lodash"
import { ChangeEvent } from "react"

interface SelectProps{
    id: string;
    value: string;
    options: Array<string>;
    className?: string;
    disabledOptions?: number;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function Select({options, value, onChange, disabledOptions = 11, className}: SelectProps){
    return(
        <select
          value={value}
          onChange={onChange}
          className={`text-bluesr-500 rounded-xl text-center focus-visible: outline-bluesr-500 ${className}`}
        >
          {options.map((option, index) => (
            <option key={option} className="" value={option} disabled={index >= disabledOptions? true: false}>
              {capitalize(option)}
            </option>
          ))}
        </select>
    )
}