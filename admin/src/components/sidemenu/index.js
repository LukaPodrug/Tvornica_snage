import { Link, useLocation } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'

import SideMenuHeader from './header'
import SideMenuIcon from './icon'
import styles from './style.module.css'

import registration from '../../assets/icons/registration.png'
import login from '../../assets/icons/login.png'

function SideMenu() {
    const location = useLocation()

    return (
        <Sidebar
            className={styles.sidebar}
        >
            <SideMenuHeader/>
            <Menu>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/registration"
                    /> }
                    icon={ <SideMenuIcon
                        icon={registration}
                    /> }
                    active={location.pathname.includes('registration')}
                >
                    Registration
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/login"
                    /> }
                    icon={ <SideMenuIcon
                        icon={login}
                    /> }
                    active={location.pathname.includes('login')}
                >
                    Login
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideMenu