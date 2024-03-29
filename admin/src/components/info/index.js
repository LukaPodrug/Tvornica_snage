import styles from './style.module.css'

function Info({ property, value }) {
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

export default Info