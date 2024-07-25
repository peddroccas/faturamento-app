import logo from '../assets/logo.png'

export function Header() {
  return (
    <header className="flex items-center justify-center bg-green-700 px-4 py-5">
      <img className="w-24" src={logo} alt="Logo" />
    </header>
  )
}
