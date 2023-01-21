import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import PuffLoader from "react-spinners/PuffLoader"

import store from '../../store'
import { SideMenuLoggedIn, SideMenuLoggedOut } from '../sidemenu'
import styles from './style.module.css'

function Layout({ loading }) {
    const [loggedIn] = useRecoilState(store.loggedIn)

    return (
        <>
            {
                loading && 
                    <div
                        className={styles.loading}
                    >
                        <PuffLoader
                            color='#90EE90'
                            size={150}
                        />
                    </div>
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