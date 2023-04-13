import styles from './style.module.css'

import logo from '../../../assets/images/logo.png'

function SideMenuHeader() {
    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.logo}
            >
                <img
                    src={logo}
                    alt='logo'
                />
            </div>
            <div
                className={styles.header}
            >
                <div
                    className={styles.headerWord1}
                >
                    tvornica
                </div>
                <div
                    className={styles.headerWord2}
                >
                    snage
                </div>
            </div>
        </div>
    )
}

export default SideMenuHeader