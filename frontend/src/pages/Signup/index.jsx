import { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    user_name: '',
    email: '',
    password: '',
    user_type: '',
}

export const Signup = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()
    const handleUserType = (type) => {
        setValues({ ...values, 'user_type': type })
    }

    const handleChanges = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        console.log(values)
        try {
            const response = await axios.post('http://localhost:5000/auth/signup', values);
            console.log(response)
            if (response.status === 201) {
                navigate("/login");
            }
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
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
            <div className={styles.loginForm} >
                <div className={styles.inputFlex}>
                    <label className={styles.label}>Enter Your Username <span className={styles.error}>*</span></label>
                    <input className={styles.inputField}
                        onChange={(e) => handleChanges(e)}
                        placeholder="Enter your username"
                        name='user_name' />
                    <p className={styles.error}></p>
                </div>
                <div className={styles.inputFlex}>
                    <label className={styles.label}>Enter your email <span className={styles.error}>*</span></label>
                    <input className={styles.inputField}
                        onChange={(e) => handleChanges(e)}
                        placeholder="Enter your email"
                        name='email' />
                    <p className={styles.error}></p>
                </div>
                <div className={styles.inputFlex}>
                    <label className={styles.label}>Enter Your Password <span className={styles.error}>*</span></label>
                    <input className={styles.inputField}
                        onChange={(e) => handleChanges(e)}
                        placeholder="Enter your password"
                        type='password'
                        name='password' />
                    <p className={styles.error}></p>
                </div>
                <button className={`primaryButton ${styles.btn}`} onClick={handleSubmit}>Sign Up</button>
                <div className={styles.loginText}>Already have an account? <Link to='/login'>Login</Link></div>
            </div>
        </div>
    )
}
