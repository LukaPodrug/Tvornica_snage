import { useState } from 'react'

import LoadingPage from '../loading'
import Header from '../../components/header'
import Menu from '../../components/menu'
import AllUsersPage from './all'
import MembershipsUsersPage from './memberships'
import BirthdaysUsersPage from './birthdays'
import AwardsUsersPage from './awards'
import styles from './style.module.css'

function UsersPage() {
    const tabs = ['all', 'membership', 'birthday', 'award']

    const [activeTab, setActiveTab] = useState(0)

    const [loading, setLoading] = useState(false)

    return (
        <>
            {
                loading ?
                    <LoadingPage/>
                    :
                    <div
                        className={styles.wrapper}
                    >
                        <div 
                            className={styles.window}
                        >
                            <Header
                                title='users'
                                style={styles.title}
                            />
                            <Menu
                                tabs={tabs}
                                activeTab={activeTab}
                                changeActiveTab={setActiveTab}
                                style={styles.menu}
                            />
                            {
                                activeTab === 0 &&
                                    <AllUsersPage/>
                            }
                            {
                                activeTab === 1 &&
                                    <MembershipsUsersPage/>
                            }
                            {
                                activeTab === 2 &&
                                    <BirthdaysUsersPage/>
                            }
                            {
                                activeTab === 3 &&
                                    <AwardsUsersPage/>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default UsersPage