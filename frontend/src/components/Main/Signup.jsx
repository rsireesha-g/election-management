import { useEffect, useState } from "react";
import styles from "./LoginSignup.module.css";
import axios from "axios";
import { Modal } from "../Common/Modal";
import { toast } from "react-toastify";
import { Loader } from "../Common/Loader";

const initialState = {
    user_name: '',
    email: '',
    password: '',
    user_type: 'voter',
}

export const Signup = ({ onClose, handleLogin }) => {
    const [values, setValues] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        msg: ''
    });
    const handleUserType = (type) => {
        setValues({ ...values, 'user_type': type })
    }

    const handleChanges = (e) => {
        e.preventDefault();
        if (message?.msg) setMessage({ type: '', msg: '' })
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        if (!values?.user_name) {
            setMessage({ type: 'name', msg: 'Please, enter your name' })
        }
        else if (!values?.email) {
            setMessage({ type: 'email', msg: 'Please, enter your email address' })
        } else if (!values?.password) {
            setMessage({ type: 'pswd', msg: 'Please, enter your password' })
        } else {
            try {
                const response = await axios.post('http://localhost:5000/auth/signup', values);
                console.log(response)
                if (response.status === 201) {
                    setIsLoading(false);
                    setMessage({ type: 'success', msg: 'User Registered Successfully!' })
                    handleLogin();
                }
            } catch (err) {
                setIsLoading(false);
                setMessage({ type: 'error', msg: err?.response?.data?.message || err?.message })
            }
        }
    }

    useEffect(() => {
        if (message?.msg) {
            if (message?.type === 'error') toast.error(message?.msg)
            else toast.success(message?.msg)
        }
    }, [message])

    return (
        <Modal>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h2 className={styles.title}>Choose the type of user</h2>
                    <button onClick={onClose} className={styles.closeBtn}>✕</button>
                </div>
                <div className={styles.userTypeTabsFlex}>
                    <button onClick={() => handleUserType('voter')}
                        className={`${styles.tabBtn} ${values.user_type === 'voter' ? styles.active : styles.default}`}
                    >Voter</button>
                    <button onClick={() => handleUserType('committee')}
                        className={`${styles.tabBtn} ${values.user_type === 'committee' ? styles.active : styles.default}`}
                    >Committee Member</button>
                </div>
                <div className={styles.loginForm} >
                    <div className={styles.inputFlex}>
                        <label className={styles.label}>Enter Your Username <span className={styles.error}>*</span></label>
                        <input className={styles.inputField}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            }}
                            onChange={(e) => handleChanges(e)}
                            placeholder="Enter your username"
                            name='user_name' />
                        <p className={styles.error}>{message?.type === 'name' && message?.msg}</p>
                    </div>
                    <div className={styles.inputFlex}>
                        <label className={styles.label}>Enter your email <span className={styles.error}>*</span></label>
                        <input className={styles.inputField}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^\w.@+-]/g, '').toLowerCase();
                            }}
                            onChange={(e) => handleChanges(e)}
                            placeholder="Enter your email"
                            name='email' />
                        <p className={styles.error}>{message?.type === 'email' && message?.msg}</p>
                    </div>
                    <div className={styles.inputFlex}>
                        <label className={styles.label}>Enter Your Password <span className={styles.error}>*</span></label>
                        <input className={styles.inputField}
                            onChange={(e) => handleChanges(e)}
                            placeholder="Enter your password"
                            type='password'
                            autoComplete="off"
                            name='password' />
                        <p className={styles.error}>{message?.type === 'pswd' && message?.msg}</p>
                    </div>
                    <button className={`primaryButton ${styles.btn}`} onClick={handleSubmit}>{isLoading ? <Loader /> : "Sign Up"}</button>
                </div>
                <div className={styles.text}>Already have an account? <div onClick={handleLogin}>Login</div></div>

            </div>
        </Modal>
    )
}
