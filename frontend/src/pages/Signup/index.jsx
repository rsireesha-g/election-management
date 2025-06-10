import { useState } from "react";
import { Modal } from "../../components/Modal";
import styles from "./Signup.module.css";

export const Signup = () => {
    const [userType, setUserType] = useState('voter');

    const handleUserType = (type) => {
        setUserType(type)
    }

    const onHandleClose = () => {

    }
    return (
        <Modal
            title={'Welcome!'}
            onClose={onHandleClose}
        >
            <div className={styles.userTypeTabsFlex}>
                <button onClick={() => handleUserType('voter')}
                    className={`${styles.tabBtn} ${userType === 'voter' ? styles.active : styles.default}`}
                >Voter</button>
                <button onClick={() => handleUserType('committee')}
                    className={`${styles.tabBtn} ${userType === 'committee' ? styles.active : styles.default}`}
                >Committee</button>
            </div>

            <div className={styles.loginForm}>
                <label className={styles.label}>Enter your email</label>
                <input className={styles.inputField} placeholder="Enter your email" />
                <label className={styles.label}>Enter Your Password</label>
                <input className={styles.inputField} placeholder="Enter your password" />
                <label className={styles.label}>Re-Enter Your Password</label>
                <input className={styles.inputField} placeholder="Re-Enter your password" />
                <button className={`primaryButton ${styles.btn}`}>Sign Up</button>
            </div>
        </Modal>
    )
}
