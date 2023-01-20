import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import store from '../../store'
import { SideMenuLoggedIn, SideMenuLoggedOut } from '../sidemenu'

function Layout() {
    const [loggedIn] = useRecoilState(store.loggedIn)

    return (
        <>
            {
                loggedIn ? <SideMenuLoggedIn/> : <SideMenuLoggedOut/>
            }
            <Outlet/>
        </>
    )
}

export default Layout