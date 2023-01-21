import ClipLoader from "react-spinners/ClipLoader"

import styles from './style.module.css'

function Button({ text, method, loading, message, changeMessage, style }) {
    function work() {
        method()
        changeMessage(null)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.button + ' ' + style}
                onClick={() => work()}
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
            <div
                className={styles.message + ' ' + (message && styles.visible)}
            >
                {message}
            </div>
        </div>
    )
}

export default Button