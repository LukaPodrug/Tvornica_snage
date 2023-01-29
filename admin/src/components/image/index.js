import styles from './style.module.css'

function Image({ image }) {
    return (
        <div
            className={styles.wrapper}
        >
            <img
                src={image}
            />
        </div>
    )
}

export default Image