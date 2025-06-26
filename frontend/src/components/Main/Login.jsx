import { useEffect, useState } from "react";
import styles from "./LoginSignup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "../Common/Modal";
import { toast } from "react-toastify";
import { Loader } from "../Common/Loader";


const initialState = {
    email: '',
    password: '',
    user_type: 'voter',
}

export const Login = ({ onClose, handleExistingAcc }) => {
    const [values, setValues] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        msg: ''
    });
    const navigate = useNavigate()

    const handleUserType = (type) => {
        setValues({ ...values, 'user_type': type })
    }

    const handleChanges = (e) => {
        e.preventDefault();
        if (message?.msg) setMessage({ type: '', msg: '' })
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleLogin = async () => {
        setIsLoading(true);
        if (!values?.email) {
            setMessage({ type: 'email', msg: 'Please, enter your email address' })
        } else if (!values?.password) {
            setMessage({ type: 'pswd', msg: 'Please, enter your password' })
        } else {
            try {
                const response = await axios.post('http://localhost:5000/auth/login', values);
                console.log(response)
                if (response.status === 200) {
                    setIsLoading(false);
                    localStorage.setItem('token', response?.data?.token);
                    localStorage.setItem('user_type', response?.data?.user?.user_type);
                    setMessage({ type: 'success', msg: 'User Login Successful!' });
                    setTimeout(() => {
                        if (response?.data?.user?.user_type === 'voter') navigate(`/dashboard/voter?user_id=${response?.data?.user?.id}`)
                        if (response?.data?.user?.user_type === 'committee') navigate("/dashboard/committee")
                    }, 1500);
                }
            } catch (err) {
                setIsLoading(false);
                setMessage({ type: 'error', msg: err?.response?.data?.message || err?.message })
                console.log(err)
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

                <div className={styles.loginForm}>
                    <div className={styles.inputFlex}>
                        <label className={styles.label}>Enter your email <span className={styles.error}>*</span></label>
                        <input className={styles.inputField}
                            name='email'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^\w.@+-]/g, '').toLowerCase();
                            }}
                            onChange={(e) => handleChanges(e)}
                            required
                            placeholder="Enter your email" />
                        <p className={styles.error}>{message?.type === 'email' && message?.msg}</p>
                    </div>
                    <div className={styles.inputFlex}>
                        <label className={styles.label}>Enter Your Password <span className={styles.error}>*</span></label>
                        <input className={styles.inputField}
                            onChange={(e) => handleChanges(e)}
                            name='password'
                            type='password'
                            autoComplete="off"
                            placeholder="Enter your password" />
                        <p className={styles.error}>{message?.type === 'pswd' && message?.msg}</p>
                    </div>
                    <button className={`primaryButton ${styles.btn}`} onClick={handleLogin}> {isLoading ? <Loader /> : "Login"}</button>
                </div>
                <div className={styles.text}>Don't have an account? <div onClick={handleExistingAcc}>SignUp</div></div>

            </div>
        </Modal>
    )
}
