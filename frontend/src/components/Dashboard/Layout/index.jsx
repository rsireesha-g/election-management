import { Header } from "../Header";
import styles from "./layout.module.css";

export const Layout = ({ title, children }) => {
    return (
        <div className="dashboardMainComponent">
            <Header title={title}></Header>
            <div className={styles.bodyComponent}>{children}</div>
        </div>
    )
}
