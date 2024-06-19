import saoRafaelLogo from '../assets/saoRafael-logo.png'

export function Header() {
  return (
    <header className="flex items-center justify-center bg-aliceblue px-4 py-5">
      <img className="w-52" src={saoRafaelLogo} alt="Logo" />
    </header>
  )
}
