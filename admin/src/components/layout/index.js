import { Outlet } from 'react-router-dom'

import SideMenu from '../sidemenu'

function Layout() {
    return (
        <>
            <SideMenu/>
            <Outlet/>
        </>
    )
}

export default Layout