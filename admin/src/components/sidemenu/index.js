import { Link, useLocation } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'

import SideMenuHeader from './header'
import SideMenuIcon from './icon'
import styles from './style.module.css'

import registration from '../../assets/icons/registration.png'
import login from '../../assets/icons/login.png'
import profile from '../../assets/icons/profile.png'
import trainings from '../../assets/icons/trainings.png'
import users from '../../assets/icons/users.png'
import logout from '../../assets/icons/logout.png'

function SideMenuLoggedIn() {
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
                        to="/profile"
                    /> }
                    icon={ <SideMenuIcon
                        icon={profile}
                    /> }
                    active={location.pathname.includes('profile')}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/trainings"
                    /> }
                    icon={ <SideMenuIcon
                        icon={trainings}
                    /> }
                    active={location.pathname.includes('trainings')}
                >
                    Trainings
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/users"
                    /> }
                    icon={ <SideMenuIcon
                        icon={users}
                    /> }
                    active={location.pathname.includes('users')}
                >
                    Users
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/login"
                    /> }
                    icon={ <SideMenuIcon
                        icon={logout}
                    /> }
                >
                    Logout
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

function SideMenuLoggedOut() {
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
                        to="/login"
                    /> }
                    icon={ <SideMenuIcon
                        icon={login}
                    /> }
                    active={location.pathname.includes('login')}
                >
                    Login
                </MenuItem>
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
            </Menu>
        </Sidebar>
    )
}

export {
    SideMenuLoggedIn,
    SideMenuLoggedOut
}