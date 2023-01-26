import ClipLoader from "react-spinners/ClipLoader"

import styles from './style.module.css'

function Button({ disabled, text, method, loading, showMessage, message, changeMessage, buttonStyle, messageStyle }) {
    function work() {
        method()
        changeMessage(null)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.button + ' ' + buttonStyle + ' ' + (disabled && styles.disabled)}
                onClick={disabled ? () => {} : () => work()}
            >
                {
                    loading ? 
                        <ClipLoader 
                            size={10}
                        /> 
                        : 
                        text
                }
            </div>
            {
                showMessage && 
                    <div
                        className={styles.message + ' ' + messageStyle + ' ' + (message && styles.visible)}
                    >
                        {message}
                    </div>
            }
        </div>
    )
}

export default Button