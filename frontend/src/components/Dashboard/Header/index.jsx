import styles from "./Header.module.css"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegFileImage } from "react-icons/fa";
import { useState } from "react";

export const Header = ({ type }) => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('user_id');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const Navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_type');
        Navigate("/")
    }
    return (
        <header className={styles.header}>
            {
                type === 'committee' &&
                <div className={styles.flex}>
                    <div className={styles.logo}>
                        <Link to='/dashboard/committee'> Election Committee Dashboard</Link>
                    </div>
                    <div className={styles.btnsFlex}>
                        <button className={`primaryButton ${styles.btn}`} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            }
            {type === "voter" &&
                <div className={styles.flex}>
                    <div className={styles.logo}>
                        <Link to={`/dashboard/voter?user_id=${id}`}>  Election Voter Dashboard</Link>
                    </div>
                    <div className={styles.profileComponent}>
                        <div className={styles.profile} onClick={() => { console.log('first', isDropdownOpen); setIsDropdownOpen(!isDropdownOpen) }}>
                            <CgProfile className={styles.profileIcon} />
                        </div>
                        {isDropdownOpen &&
                            <div className={styles.dropdownWrapper}>
                                <div className={styles.dropdown}>
                                    <div className={styles.itemBox}><FaRegFileImage /> <Link to={`/dashboard/voter/register?user_id=${id}`}>Register</Link></div>
                                    <div className={styles.itemBox}> <BsPersonCircle /> <Link to={`/dashboard/voter/myProfile?user_id=${id}`}>My Profile</Link></div>
                                    <div className={styles.itemBox}> <AiOutlineLogout /> <div onClick={handleLogout}>Logout</div></div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </header>
    )
}
