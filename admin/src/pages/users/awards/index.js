import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import store from '../../../store'
import LoadingSection from '../../../sections/loading'
import UsersSection from '../../../sections/users'
import Pagination from '../../../components/pagination'
import { getUsersByAwardsAPI } from '../../../API/user'
import styles from './style.module.css'

function AwardsUsersPage() {
    const [token] = useRecoilState(store.token)

    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [awardsUsers, setAwardsUsers] = useState([])

    const [userEdited, setUserEdited] = useState(false)
    const [usersLoading, setUsersLoading] = useState(true)

    useEffect(() => {
        async function getUsersByAwards() {
            try {
                const getUsersByAwardsResponse = await getUsersByAwardsAPI(token)
                setAwardsUsers(getUsersByAwardsResponse.data)
                setMaxPage(Math.ceil(getUsersByAwardsResponse.data.length / 6))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setUsersLoading(true)
            await getUsersByAwards()
            setUsersLoading(false)
        }

        fetchAPI()
    }, [userEdited])

    return (
        <>
            {
                usersLoading ?
                    <LoadingSection/>
                    :
                    <UsersSection
                        users={awardsUsers.slice((page - 1) * 6, (page - 1) * 6 + 6)}
                        showAwards={true}
                        showToggle={false}
                        toggled={null}
                        changeToggled={() => {}}
                        reduced={false}
                        page={page}
                        showEdit={true}
                        message='no users wto award'
                        userEdited={userEdited}
                        changeUserEdited={setUserEdited}
                        showDelete={false}
                        removeReservation={() => {}}
                        showAdd={false}
                        addUser={() => {}}
                        maxUsers={5}
                        style={styles.users}
                    />
            }
            <Pagination
                page={page}
                changePage={setPage}
                maxPage={maxPage}
                disabled={usersLoading}
            />
        </>
    )
}

export default AwardsUsersPage