import styles from './style.module.css'

function Header({ title, style }) {
    return (
        <div
            className={styles.wrapper + ' ' + style}
        >
            <label
                className={styles.text}
            >
                {title}
            </label>
        </div>
    )
}

export default Header