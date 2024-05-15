import saoRafaelLogo from '../assets/saoRafael-logo.png'

export function Header() {
  return (
    <header className="bg-aliceblue flex justify-center py-5 px-0">
      <img className="w-52" src={saoRafaelLogo} alt="Logo" />
    </header>
  )
}
