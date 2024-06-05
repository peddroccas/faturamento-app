import saoRafaelLogo from '../assets/saoRafael-logo.png'

export function Header() {
  return (
    <header className="flex justify-center bg-aliceblue px-0 py-5">
      <img className="w-52" src={saoRafaelLogo} alt="Logo" />
    </header>
  )
}
