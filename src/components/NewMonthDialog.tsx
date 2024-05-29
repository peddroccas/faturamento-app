import { BasicTextField } from "../components/TextField";
import { LoadingButtonComponent } from "../components/LoadingButton";
import { capitalize } from "lodash";
import { addFaturamentoMonth } from "../services/api";
import { FormEvent, useState } from "react";


export function NewMonthDialog(){
    const [value, setValue] = useState<string>();
    const [date, setDate] = useState<string>();
    const [loading, setLoading] = useState(false);

    
    const handleFormOnClick = async (event: FormEvent) => {
        event.preventDefault();
        try {
          setLoading(true);
          await addFaturamentoMonth("year", "month", value);
        } catch (error) { }
      };

    
    return(
        <div className="w-auto bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center gap-4">
            <h1 className="mt-2 font-roboto  text-xl font-medium">Novo Faturamento</h1>
            <div className="flex flex-row items-center">
              <BasicTextField
                type="value"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
              <BasicTextField
                type="dae"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <LoadingButtonComponent
                loading={loading}
                onClick={handleFormOnClick}
                value="Enviar"
              />
            </div>
          </div>
    )
    
}