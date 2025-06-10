import { Image } from "react"
import { Header } from '../../components/Header/Header'
import { ListingGrid } from '../../components/Listing/ListingGrid'
import { Footer } from '../../components/Footer/Footer'
import bannerImg from "../../assests/banner.webp"
import styles from "./HomePage.module.css"


export const HomePage = () => {
    return (
        <div className="main-component">
            <Header />
            <div className={styles.heroBanner}>
                <img src={bannerImg} alt="banner" className={styles.banner} />
            </div>
            <Footer />
        </div>
    )
}
