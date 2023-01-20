import styles from './style.module.css'

import error from '../../../assets/icons/error.png'

function ErrorInput({ input, message, changeError, style }) {
    function removeError() {
        changeError(false)
        input.current.focus()
    }

    return (
        <div
            className={styles.wrapper + ' ' + style}
        >
            <div
                className={styles.icon}
                onClick={() => removeError()}
            >
                <img
                    src={error}
                    alt='error'
                />
            </div>
            <div
                className={styles.message}
            >
                {message}
            </div>
        </div>
    )
}

export default ErrorInput