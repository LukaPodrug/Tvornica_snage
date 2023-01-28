import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import store from '../../../store'
import Search from '../../../sections/search'
import UsersSection from '../../../sections/users'
import Pagination from '../../../components/pagination'
import { getNumberOfUsersAPI, getUsersByPageAPI } from '../../../API/user'
import styles from './style.module.css'

function AllUsersPage() {
    const [token] = useRecoilState(store.token)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [usersByPage, setUsersByPage] = useState([])
    const [totalNumberOfUsers, setTotalNumberOfUsers] = useState(0)
    const [filteredUsers, setFilteredUsers] = useState([])

    const [userEdited, setUserEdited] = useState(false)
    const [usersLoading, setUsersLoading] = useState(true)

    useEffect(() => {
        async function getUsersByPage() {
            try {
                const getNumberOfUsersResponse = await getNumberOfUsersAPI(token)
                setTotalNumberOfUsers(getNumberOfUsersResponse.data)
                const getUsersByPageResponse = await getUsersByPageAPI(token, page)
                setUsersByPage(getUsersByPageResponse.data)
                setMaxPage(Math.ceil(getNumberOfUsersResponse.data / 10))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setUsersLoading(true)
            await getUsersByPage()
            setTimeout(() => {
                setUsersLoading(false)
            }, 500)
        }

        if(firstName === '' && lastName === '') {
            setFilteredUsers([])
            fetchAPI()
        }
    }, [page, userEdited, firstName, lastName])

    async function search() {

    }

    return (
        <>
            <Search
                firstName={firstName}
                changeFirstName={setFirstName}
                lastName={lastName}
                changeLastName={setLastName}
                search={search}
            />
            <UsersSection
                users={(filteredUsers.length === 0 && firstName === '' && lastName === '') ? usersByPage : filteredUsers}
                showToggle={false}
                toggled={null}
                changeToggled={() => {}}
                reduced={false}
                page={page}
                showEdit={true}
                message='no users found'
                userEdited={userEdited}
                changeUserEdited={setUserEdited}
                showDelete={false}
                removeReservation={() => {}}
                showAdd={false}
                addUser={() => {}}
                maxUsers={10}
                style={styles.users}
            />
            <Pagination
                page={page}
                changePage={setPage}
                maxPage={maxPage}
            />
        </>
    )
}

export default AllUsersPage