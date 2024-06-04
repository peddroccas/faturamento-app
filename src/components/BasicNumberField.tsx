import { ChangeEvent } from "react";
import { NumericFormat } from "react-number-format";
import { BasicTextField } from "./BasicTextField";

interface NumberFieldProps{
    value?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}


export function BasicNumberField({value, onChange}: NumberFieldProps) {
    return (
        <NumericFormat
            customInput={BasicTextField}
            type="value"
            value={value}
            onChange={onChange}
            allowNegative={false}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
        />
    );
}
