import styles from './index.module.css';

export const TabComponent = ({ tabs, handleTabSelect, activeTab }) => {
    return (
        <div className={styles.tabsComponent}>
            {tabs?.map((tab, ind) => (
                <div className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`} key={ind} onClick={() => handleTabSelect(tab)}>{tab}</div>
            ))}
        </div>
    )
}
