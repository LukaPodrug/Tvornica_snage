import styles from './style.module.css'

import logo from '../../../assets/images/logo.png'

function SideMenuHeader({ collapsed }) {
    return (
        <div
            className={styles.wrapper + ' ' + (collapsed && styles.wrapperCollapsed)}
        >
            <div
                className={styles.logo + ' ' + (collapsed && styles.logoCollapsed)}
            >
                <img
                    src={logo}
                    alt='logo'
                />
            </div>
            {
                !collapsed &&
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
            }
        </div>
    )
}

export default SideMenuHeader