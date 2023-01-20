import styles from './style.module.css'

function Button({ text, method, style }) {
    return (
        <div
            className={styles.wrapper + ' ' + style}
            onClick={() => method()}
        >
            {text}
        </div>
    )
}

export default Button