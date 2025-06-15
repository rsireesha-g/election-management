import styles from './index.module.css';

export const ElectionTabComponent = ({ types, handleTypeSelect, activeType }) => {
    return (
        <div className={styles.typesComponent}>
            {types?.map((type, ind) => (
                <div className={`${styles.type} ${activeType === type ? styles.activeType : ''}`} key={ind} onClick={() => handleTypeSelect(type)}>{type}</div>
            ))}
        </div>
    )
}
