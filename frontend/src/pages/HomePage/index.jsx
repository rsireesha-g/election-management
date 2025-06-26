import { Header } from '../../components/Main/Header/Header'
import { Footer } from '../../components/Main/Footer/Footer'
import styles from "./HomePage.module.css"
import { Slide, ToastContainer } from 'react-toastify'


export const HomePage = () => {
    return (
        <div>
            <Header />
            <div className="main-component">
                <div className={styles.heroBanner}>
                </div>
            </div>
            <Footer />
            <ToastContainer
                autoClose={2000}
                transition={Slide}
                closeOnClick
                pauseOnHover
                newestOnTop />
        </div>
    )
}
