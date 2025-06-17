import { useState } from "react";
import styles from "./Header.module.css"
import { Link } from "react-router-dom";
import { Login } from "../Login";
import { Signup } from "../Signup";

export const Header = () => {
    const [isLoginModelOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.flex}>
                    <Link to="/" className={styles.logo}>
                        Elections Management
                    </Link>
                    <div className={styles.nav_links}>
                        <div className={styles.link}>Home</div>
                        <div className={styles.link}>About Us</div>
                    </div>
                    {/* <h2 className={styles.title}>Election Management System</h2> */}
                    <div className={styles.btnsFlex}>
                        <button className={`primaryButton ${styles.btn}`} onClick={() => setIsLoginModalOpen(true)}>Login</button>
                        <button className={`primaryButton ${styles.btn}`} onClick={() => setIsSignUpModalOpen(true)}>Signup</button>
                    </div>
                </div>
            </header>
            {isLoginModelOpen &&
                <Login
                    onClose={() => setIsLoginModalOpen(false)}
                    handleExistingAcc={() => {
                        setIsLoginModalOpen(false);
                        setIsSignUpModalOpen(true)
                    }}
                />
            }
            {isSignUpModalOpen &&
                <Signup
                    onClose={() => setIsSignUpModalOpen(false)}
                    handleLogin={() => {
                        setIsSignUpModalOpen(false);
                        setIsLoginModalOpen(true)
                    }}
                />
            }
        </>
    )
}
