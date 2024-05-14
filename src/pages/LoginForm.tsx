import { FormEvent, useState } from "react";
import { auth } from "../services/firebase.ts";
import { useNavigate } from "react-router-dom";
import { BasicTextField } from "../components/TextField.tsx";


export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/')
      // Lógica adicional após o login bem-sucedido (redirecionamento, etc.)
    } catch (error) {
      alert("Usuário não autenticado");
      console.error("Erro ao fazer login");
    }
  };

  return (
    <div className="flex justify-center m-auto px-4 py-0">
      <div onSubmit={handleLogin} className="h-max flex flex-col items-center justify-center rounded-lg p-4 mt-20 gap-px text-bluesr-400 bg-aliceblue">
        <h1 className="font-agdasima text-3xl font-bold">Sign in</h1>
        <div className="flex flex-col mt-4 gap-2">
          <BasicTextField
            type="email"
            value={email}
            onChange={(event) => {
              console.log(event);
              setEmail(event.target.value)
            }}
          />
          <BasicTextField
            type="password"
            value={password}
            onChange={(event) => {
              console.log(event);
              setPassword(event.target.value)
            }}
          />
        </div>
        <button className="box-border px-3 py-px mt-4 bg-bluesr-400 text-aliceblue font-medium rounded focus:outline-none border focus:border-bluesr-800 hover:bg-bluesr-500" type="submit">Entrar</button>
      </div>
    </div>
  );
}
