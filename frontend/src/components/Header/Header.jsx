import styles from "./Header.module.css"
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.flex}>
                <Link to="/" className={styles.logo}>
                    EM
                </Link>
                <h2 className={styles.title}>Election Management System</h2>
                <div className={styles.btnsFlex}>
                    <button className={`primaryButton ${styles.btn}`}>Login</button>
                    <button className={`primaryButton ${styles.btn}`}>Signup</button>
                </div>
            </div>
        </header>
    )
}
