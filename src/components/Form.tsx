import { ChangeEvent } from "react";
import { LoadingButtonComponent } from "./LoadingButton";
import { BasicTextField } from "./TextField";

interface FormProps{
    type: string,
    value: string | number | undefined,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    onClick: () => void,

}

export function Form({type, value, onChange, onClick}:FormProps) {
  return (
    <div>
      <div className="flex flex-col mt-4 gap-2">
        <BasicTextField
          type={type}
          value={value}
          onChange={(event) => {
            onChange();
          }}
        />
        <BasicTextField
          type="password"
          value={password}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      </div>
      <LoadingButtonComponent
        loading={loading}
        onClick={onClick}
        value="Enviar"
      />
    </div>
  );
}
