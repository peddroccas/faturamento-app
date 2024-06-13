import { FormEvent, useContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase.ts'
import { useNavigate } from 'react-router-dom'
import { BasicTextField } from '../components/BasicTextField.tsx'
import { LoadingButtonComponent } from '../components/LoadingButton.tsx'
import { AuthContext } from '../contexts/AuthContext.tsx'

export function LoginForm() {
  const { handleUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // auth.signOut()
    const isLogged = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home/faturamento')
      }
    })
    return () => isLogged()
  }, [navigate])

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setLoading(true)
      await auth.signInWithEmailAndPassword(email, password)
      handleUser()
      navigate('/home/faturamento')
      // Lógica adicional após o login bem-sucedido (redirecionamento, etc.)
    } catch (error) {
      alert('Usuário não autenticado')
      window.location.reload()
      console.error('Erro ao fazer login')
    }
  }

  return (
    <div className="m-auto flex justify-center px-4 py-0">
      <div
        onSubmit={handleLogin}
        className="mt-20 flex h-max flex-col items-center justify-center gap-px rounded-lg bg-aliceblue p-4 text-redsr-400"
      >
        <h1 className="mt-2 font-roboto  text-2xl font-medium">ENTRAR</h1>
        <div className="mt-4 flex flex-col gap-2">
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
