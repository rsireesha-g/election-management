import { Header } from "../Header";

export const Layout = ({ title, children }) => {
    return (
        <div className="dashboardMainComponent">
            <Header title={title}></Header>
            {children}
        </div>
    )
}
