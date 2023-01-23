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
                        TVORNICA
                        <br/>
                        SNAGE
                    </div>
            }
        </div>
    )
}

export default SideMenuHeader