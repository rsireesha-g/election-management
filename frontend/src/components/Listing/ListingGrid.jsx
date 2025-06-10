import styles from "./ListingGrid.module.css"

export const ListingGrid = () => {
    return (
        <div className={styles.listingComponent}>
            <div className={styles.list}>Voters</div>
            <div className={styles.list}>Candidates</div>
            <div className={styles.list}>Elections</div>
            <div className={styles.list}>Votes</div>
        </div>
    )
}
