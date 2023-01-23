import MoonLoader from 'react-spinners/MoonLoader'

import styles from './style.module.css'

function LoadingSection() {
    return (
        <div
            className={styles.wrapper}
        >
            <MoonLoader
                color='#90EE90'
            />
        </div>
    )
}

export default LoadingSection