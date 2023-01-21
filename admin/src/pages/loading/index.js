import PuffLoader from "react-spinners/PuffLoader"

import styles from './style.module.css'

function LoadingPage() {
    return (
        <div
            className={styles.wrapper}
        >
            <PuffLoader
                color='#90EE90'
                size={150}
            />
        </div>
    )
}

export default LoadingPage