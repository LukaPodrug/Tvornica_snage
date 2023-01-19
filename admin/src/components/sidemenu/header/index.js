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
                />
            </div>
            <div
                className={styles.header}
            >
                TVORNICA
                <br/>
                SNAGE
            </div>
        </div>
    )
}

export default SideMenuHeader