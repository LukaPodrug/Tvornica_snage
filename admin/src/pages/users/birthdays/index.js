import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import store from '../../../store'
import LoadingSection from '../../../sections/loading'
import UsersSection from '../../../sections/users'
import Pagination from '../../../components/pagination'
import { getUsersByBirthdaysAPI  } from '../../../API/user'
import styles from './style.module.css'

function BirthdaysUsersPage() {
    const [token] = useRecoilState(store.token)

    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [birthdayUsers, setBirthdayUsers] = useState([])

    const [userEdited, setUserEdited] = useState(false)
    const [usersLoading, setUsersLoading] = useState(true)

    useEffect(() => {
        async function getUsersByBirthdays() {
            try {
                const getUsersByBirthdaysResponse = await getUsersByBirthdaysAPI(token)
                setBirthdayUsers(getUsersByBirthdaysResponse.data)
                setMaxPage(Math.ceil(getUsersByBirthdaysResponse.data.length / 6))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setUsersLoading(true)
            await getUsersByBirthdays()
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
                        users={birthdayUsers.slice((page - 1) * 6, (page - 1) * 6 + 6)}
                        showAwards={false}
                        showToggle={false}
                        toggled={null}
                        changeToggled={() => {}}
                        reduced={false}
                        page={page}
                        showEdit={true}
                        message='no users with birthday tommorow'
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

export default BirthdaysUsersPage