import { useState } from "react";
import { Modal } from "../../components/Modal";
import styles from "./Login.module.css";

export const Login = () => {
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
            <h3 className={styles.title}>Choose the type of user</h3>
            <div className={styles.userTypeTabsFlex}>
                <button onClick={() => handleUserType('voter')}
                    className={`${styles.tabBtn} ${userType === 'voter' ? styles.active : styles.default}`}
                >Voter</button>
                <button onClick={() => handleUserType('committee')}
                    className={`${styles.tabBtn} ${userType === 'committee' ? styles.active : styles.default}`}
                >Committee</button>
            </div>

            <div className={styles.loginForm}>
                <div className={styles.inputFlex}>
                    <label className={styles.label}>Enter your email <span className={styles.error}>*</span></label>
                    <input className={styles.inputField} placeholder="Enter your email" />
                    <p className={styles.error}></p>
                </div>
                <div className={styles.inputFlex}>
                    <label className={styles.label}>Enter Your Password <span className={styles.error}>*</span></label>
                    <input className={styles.inputField} placeholder="Enter your password" />
                    <p className={styles.error}>hsgdaejtyw</p>
                </div>
                <button className={`primaryButton ${styles.btn}`}>Login</button>
            </div>
        </Modal>
    )
}
