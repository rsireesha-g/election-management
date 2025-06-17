import styles from "./Header.module.css"
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ title }) => {
    const Navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_type');
        Navigate("/login")
    }
    return (
        <header className={styles.header}>
            <div className={styles.flex}>
                <div className={styles.logo}>
                    {title}
                </div>
                <div className={styles.btnsFlex}>
                    <button className={`primaryButton ${styles.btn}`} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    )
}
