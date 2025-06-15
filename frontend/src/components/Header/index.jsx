import styles from "./Header.module.css"
import { Link } from "react-router-dom";

export const Header = ({ title }) => {
    return (
        <header className={styles.header}>
            <div className={styles.flex}>
                <div className={styles.logo}>
                    {title}
                </div>
                <div className={styles.btnsFlex}>
                    <button className={`primaryButton ${styles.btn}`}>Logout</button>
                </div>
            </div>
        </header>
    )
}
