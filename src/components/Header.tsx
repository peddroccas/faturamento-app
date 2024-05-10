import styles from './Header.module.css'
import saoRafaelLogo from '../assets/saoRafael-logo.png'

export function Header() {
    return (
        <header className={styles.header}>
            <img className={styles.img} src={saoRafaelLogo} alt="Logo" />
        </header>
    )
}