import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import store from '../../store'
import { SideMenuLoggedIn, SideMenuLoggedOut } from '../sidemenu'
import LoadingPage from '../../pages/loading'

function Layout({ loading }) {
    const [loggedIn] = useRecoilState(store.loggedIn)

    if(loading) {
        return <LoadingPage/>
    }

    return (
        <>
            {
                loggedIn ? 
                    <SideMenuLoggedIn/> 
                    : 
                    <SideMenuLoggedOut/>
            }
            <Outlet/>
        </>
    )
}

export default Layout