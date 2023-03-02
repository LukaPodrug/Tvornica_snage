import MoonLoader from 'react-spinners/MoonLoader'

import styles from './style.module.css'

function LoadingSection() {
    return (
        <div
            className={styles.wrapper}
        >
            <MoonLoader
                color='#e04f5f'
            />
        </div>
    )
}

export default LoadingSection