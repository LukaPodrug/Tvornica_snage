import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import store from '../../store'
import { SideMenuLoggedIn, SideMenuLoggedOut } from '../sidemenu'
import LoadingPage from '../../pages/loading'

function Layout({ loading }) {
    const [loggedIn] = useRecoilState(store.loggedIn)

    return (
        <>
            {
                loading && <LoadingPage/>
            }
            {
                !loading &&
                    <>
                        {
                            loggedIn ? 
                                <SideMenuLoggedIn/> 
                                : 
                                <SideMenuLoggedOut/>
                        }
                        <Outlet/>
                    </>
            }
        </>
    )
}

export default Layout