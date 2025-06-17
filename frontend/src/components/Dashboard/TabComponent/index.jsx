import styles from './index.module.css';

export const TabComponent = ({ tabs, handleTabSelect, activeTab, tabType }) => {
    return (
        <>
            {tabType === 'mainTabs' ?
                <div className={styles.tabsComponent}>
                    {tabs?.map((tab, ind) => (
                        <div className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`} key={ind} onClick={() => handleTabSelect(tab)}>{tab}</div>
                    ))}
                </div>

                :
                <div className={styles.typesComponent}>
                    {tabs?.map((type, ind) => (
                        <div className={`${styles.type} ${activeTab === type?.election_type ? styles.activeType : ''}`} key={ind} onClick={() => handleTabSelect(type?.election_type)}>{type?.election_type}</div>
                    ))}
                </div>
            }</>
    )
}
