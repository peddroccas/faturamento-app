import { FormEvent, useState } from 'react'
import { auth } from '../services/firebase.ts'
import { useNavigate } from 'react-router-dom'
import { BasicTextField } from '../components/BasicTextField.tsx'
import { LoadingButtonComponent } from '../components/LoadingButton.tsx'

export function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setLoading(true)
      await auth.signInWithEmailAndPassword(email, password)
      navigate('/home/faturamento')
      // Lógica adicional após o login bem-sucedido (redirecionamento, etc.)
    } catch (error) {
      alert('Usuário não autenticado')
      window.location.reload()
      console.error('Erro ao fazer login')
    }
  }

  return (
    <div className="flex justify-center m-auto px-4 py-0">
      <div
        onSubmit={handleLogin}
        className="h-max flex flex-col items-center justify-center rounded-lg p-4 mt-20 gap-px text-redsr-400 bg-aliceblue"
      >
        <h1 className="mt-2 font-roboto  text-2xl font-medium">ENTRAR</h1>
        <div className="flex flex-col mt-4 gap-2">
          <BasicTextField
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <BasicTextField
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <LoadingButtonComponent
          loading={loading}
          onClick={handleLogin}
          value="Enviar"
        />
      </div>
    </div>
  )
}
