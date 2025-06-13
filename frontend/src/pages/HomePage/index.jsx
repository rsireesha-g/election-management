import { Image } from "react"
import { Header } from '../../components/Header/Header'
import { ListingGrid } from '../../components/Listing/ListingGrid'
import { Footer } from '../../components/Footer/Footer'
import bannerImg from "../../assests/hero-img.jpg"
import styles from "./HomePage.module.css"


export const HomePage = () => {
    return (
        <div>
            <Header />
            <div className="main-component">
                <div className={styles.heroBanner}>
                    {/* <img src={bannerImg} alt="banner" className={styles.banner} /> */}
                </div>
            </div>
            <Footer />
        </div>
    )
}
