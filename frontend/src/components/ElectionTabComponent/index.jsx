import styles from './index.module.css';

export const ElectionTabComponent = ({ types, handleTypeSelect, activeType }) => {
    return (
        <div className={styles.typesComponent}>
            {types?.map((type, ind) => (
                <div className={`${styles.type} ${activeType === type?.election_type ? styles.activeType : ''}`} key={ind} onClick={() => handleTypeSelect(type?.election_type)}>{type?.election_type}</div>
            ))}
        </div>
    )
}
