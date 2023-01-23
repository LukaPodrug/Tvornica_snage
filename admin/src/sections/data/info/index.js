import styles from './style.module.css'

function DataSectionInfo({ property, value }) {
    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.property}
            >
                {property}
            </div>
            <div 
                className={styles.value}
            >
                {value}
            </div>
        </div>
    )
}

export default DataSectionInfo