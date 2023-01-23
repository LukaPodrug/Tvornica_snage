import { useState } from 'react'
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
    const [, setOwnData] = useRecoilState(store.ownData)

    const [collapsed, setCollapsed] = useState(false)

    const location = useLocation()

    function logout() {
        setLoggedIn(false)
        setToken(null)
        setOwnData(null)
        localStorage.removeItem('token')
    }

    return (
        <Sidebar
            className={styles.sidebar}
            defaultCollapsed={false}
        >
            <SideMenuHeader
                collapsed={collapsed}
            />
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
                    profile
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
                    trainings
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
                    users
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
                    logout
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

function SideMenuLoggedOut() {
    const [collapsed, setCollapsed] = useState(false)

    const location = useLocation()

    return (
        <Sidebar
            className={styles.sidebar}
            defaultCollapsed={false}
        >
            <SideMenuHeader
                collapsed={collapsed}
            />
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
                    login
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
                    registration
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export {
    SideMenuLoggedIn,
    SideMenuLoggedOut
}