import { Slide, ToastContainer } from "react-toastify";
import { Header } from "../Header";
import styles from "./layout.module.css";

export const Layout = ({ type, children }) => {
    return (
        <div className="dashboardMainComponent">
            <Header type={type}></Header>
            <div className={styles.bodyComponent}>{children}</div>
            <ToastContainer
                autoClose={1500}
                transition={Slide}
                closeOnClick
                pauseOnHover
                newestOnTop
            />

        </div>
    )
}
