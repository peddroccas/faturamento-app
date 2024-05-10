import { FormEvent, useState } from "react";
import { auth } from "../services/firebase.ts";
import { useNavigate } from "react-router-dom";


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
    <div className="bg-blueSr h-screen flex justify-center m-auto px-4 py-0">
      <form onSubmit={handleLogin} className="max-h-40 flex flex-col items-center justify-center rounded-lg p-4 mt-20 gap-px text-blueSr bg-aliceblue">
        <h1>Sign in</h1>
        <div className="flex flex-col mt-4 gap-2">
          <input
            type="email"
            className="w-80 p-1 rounded border border-solid border-blueSr focus:outline-none focus:ring-1 focus:blueDSr"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-80 p-1 rounded border border-solid border-blueSr focus:outline-none focus:ring-1 focus:blueDSr"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
