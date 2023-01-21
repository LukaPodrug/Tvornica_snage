import { Link, useLocation } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { useRecoilState } from 'recoil'

import store from '../../store'
import SideMenuHeader from './header'
import SideMenuIcon from './icon'
import styles from './style.module.css'

import registrationIcon from '../../assets/icons/registration.png'
import loginIcon from '../../assets/icons/login.png'
import profileIcon from '../../assets/icons/profile.png'
import trainingsIcon from '../../assets/icons/trainings.png'
import usersIcon from '../../assets/icons/users.png'
import logoutIcon from '../../assets/icons/logout.png'

function SideMenuLoggedIn() {
    const [, setLoggedIn] = useRecoilState(store.loggedIn)
    const [, setToken] = useRecoilState(store.token)

    const location = useLocation()

    function logout() {
        setLoggedIn(false)
        setToken(null)
        localStorage.removeItem('token')
    }

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
                        icon={profileIcon}
                    /> }
                    active={location.pathname.includes('profile')}
                >
                    PROFILE
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/trainings"
                    /> }
                    icon={ <SideMenuIcon
                        icon={trainingsIcon}
                    /> }
                    active={location.pathname.includes('trainings')}
                >
                    TRAININGS
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/users"
                    /> }
                    icon={ <SideMenuIcon
                        icon={usersIcon}
                    /> }
                    active={location.pathname.includes('users')}
                >
                    USERS
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/login"
                    /> }
                    icon={ <SideMenuIcon
                        icon={logoutIcon}
                    /> }
                    onClick={() => logout()}
                >
                    LOGOUT
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
                        icon={loginIcon}
                    /> }
                    active={location.pathname.includes('login')}
                >
                    LOGIN
                </MenuItem>
                <MenuItem
                    className={styles.menuItem}
                    component={ <Link 
                        to="/registration"
                    /> }
                    icon={ <SideMenuIcon
                        icon={registrationIcon}
                    /> }
                    active={location.pathname.includes('registration')}
                >
                    REGISTRATION
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export {
    SideMenuLoggedIn,
    SideMenuLoggedOut
}