import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar'

import SideMenuHeader from './header'
import SideMenuIcon from './icon'
import styles from './style.module.css'

import registration from '../../assets/icons/registration.png'
import login from '../../assets/icons/login.png'

function SideMenu() {
    return (
        <Sidebar
            className={styles.sidebar}
        >
            <SideMenuHeader/>
            <Menu>
                <MenuItem
                    className={styles.menuItem}
                    icon={ <SideMenuIcon
                        icon={registration}
                    /> }
                >
                    Registration
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    icon={ <SideMenuIcon
                        icon={login}
                    /> }
                >
                    Login
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideMenu