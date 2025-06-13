import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Popup } from "../../components/Popup";

const initialState = {
    email: '',
    password: '',
    user_type: '',
}

export const Login = () => {
    const [values, setValues] = useState(initialState);
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
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', values);
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('token', response?.data?.token);
                localStorage.setItem('user_type', response?.data?.user?.user_type);
                setMessage({ type: 'success', msg: 'User Login Successful!' })
                if (response?.data?.user?.user_type === 'voter') navigate("/voter/dashboard")
                if (response?.data?.user?.user_type === 'committee') navigate("/committee/dashboard")
            }
        } catch (err) {
            setMessage({ type: 'error', msg: err?.response?.data?.message || err?.message })
            console.log(err)
        }
    }
    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>Choose the type of user</h3>
                <div className={styles.userTypeTabsFlex}>
                    <button onClick={() => handleUserType('voter')}
                        className={`${styles.tabBtn} ${values.user_type === 'voter' ? styles.active : styles.default}`}
                    >Voter</button>
                    <button onClick={() => handleUserType('committee')}
                        className={`${styles.tabBtn} ${values.user_type === 'committee' ? styles.active : styles.default}`}
                    >Committee</button>
                </div>

                <div className={styles.loginForm}>
                    <div className={styles.inputFlex}>
                        <label className={styles.label}>Enter your email <span className={styles.error}>*</span></label>
                        <input className={styles.inputField}
                            name='email'
                            onChange={(e) => handleChanges(e)}
                            placeholder="Enter your email" />
                        <p className={styles.error}></p>
                    </div>
                    <div className={styles.inputFlex}>
                        <label className={styles.label}>Enter Your Password <span className={styles.error}>*</span></label>
                        <input className={styles.inputField}
                            onChange={(e) => handleChanges(e)}
                            name='password'
                            type='password'
                            placeholder="Enter your password" />
                        <p className={styles.error}></p>
                    </div>
                    <button className={`primaryButton ${styles.btn}`} onClick={handleLogin}>Login</button>
                </div>
            </div>
            {message.msg && <Popup message={message} />}
        </>
    )
}
