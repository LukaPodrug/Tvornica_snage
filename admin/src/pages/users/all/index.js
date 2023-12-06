import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import store from '../../../store'
import LoadingSection from '../../../sections/loading'
import Search from '../../../sections/search'
import UsersSection from '../../../sections/users'
import Pagination from '../../../components/pagination'
import { getNumberOfUsersAPI, getUsersByPageAPI, getUsersByFirstNameAndLastNameAPI } from '../../../API/user'
import styles from './style.module.css'

function AllUsersPage() {
    const [token] = useRecoilState(store.token)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [usersByPage, setUsersByPage] = useState([])
    const [filter, setFilter] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([])

    const [userEdited, setUserEdited] = useState(false)
    const [userDeleted, setUserDeleted] = useState(false)
    const [usersLoading, setUsersLoading] = useState(true)

    useEffect(() => {
        if(firstName === '' && lastName === '') {
            setFilter(false)
            setPage(1)
        }
    }, [firstName, lastName])

    useEffect(() => {
        async function getUsersByPage() {
            try {
                const getNumberOfUsersResponse = await getNumberOfUsersAPI(token)
                const getUsersByPageResponse = await getUsersByPageAPI(token, page, 5)
                setUsersByPage(getUsersByPageResponse.data)
                setMaxPage(Math.ceil(getNumberOfUsersResponse.data / 5))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setUsersLoading(true)
            await getUsersByPage()
            setUsersLoading(false)
        }

        if(!filter) {
            fetchAPI()
        }
    }, [page, userEdited, filter])

    useEffect(() => {
        async function getUsersByPage() {
            try {
                const getNumberOfUsersResponse = await getNumberOfUsersAPI(token)
                const getUsersByPageResponse = await getUsersByPageAPI(token, page, 5)
                if(getNumberOfUsersResponse.data !== 0 && getUsersByPageResponse.data.length === 0 && page !== 1) {
                    setPage(page - 1)
                }
                else {
                    setUsersByPage(getUsersByPageResponse.data)
                }
                setMaxPage(Math.ceil(getNumberOfUsersResponse.data / 5))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setUsersLoading(true)
            await getUsersByPage()
            setUsersLoading(false)
        }
        if(!filter) {
            fetchAPI()
        }
    }, [userDeleted])

    useEffect(() => {
        async function getUsersByFirstNameAndLastName() {
            try {
                const getUsersByFirstNameAndLastNameResponse = await getUsersByFirstNameAndLastNameAPI(token, firstName, lastName)
                setFilteredUsers(getUsersByFirstNameAndLastNameResponse.data)
                setMaxPage(Math.ceil(getUsersByFirstNameAndLastNameResponse.data.length / 5))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setUsersLoading(true)
            await getUsersByFirstNameAndLastName()
            setUsersLoading(false)
        }

        if(filter) {
            fetchAPI()
        }
    }, [userEdited])

    useEffect(() => {
        async function getUsersByFirstNameAndLastName() {
            try {
                const getUsersByFirstNameAndLastNameResponse = await getUsersByFirstNameAndLastNameAPI(token, firstName, lastName)
                if(getUsersByFirstNameAndLastNameResponse.data.length % 5 === 0) {
                    setPage(page - 1)
                }
                setFilteredUsers(getUsersByFirstNameAndLastNameResponse.data)
                setMaxPage(Math.ceil(getUsersByFirstNameAndLastNameResponse.data.length / 5))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setUsersLoading(true)
            await getUsersByFirstNameAndLastName()
            setUsersLoading(false)
        }

        if(filter) {
            fetchAPI()
        }
    }, [userDeleted])

    async function searchByFirstNameAndLastName() {
        try {
            setPage(1)
            setFilter(true)
            setUsersLoading(true)
            const searchByFirstNameAndLastNameResponse = await getUsersByFirstNameAndLastNameAPI(token, firstName, lastName)
            setFilteredUsers(searchByFirstNameAndLastNameResponse.data)
            setMaxPage(Math.ceil(searchByFirstNameAndLastNameResponse.data.length / 5))
            setUsersLoading(false)
        }
        catch(error) {
            setUsersLoading(false)
            return
        }
    }

    return (
        <>
            <Search
                firstName={firstName}
                changeFirstName={setFirstName}
                lastName={lastName}
                changeLastName={setLastName}
                search={searchByFirstNameAndLastName}
            />
            {
                usersLoading ?
                    <LoadingSection/>
                    :
                    <UsersSection
                        showNumber={filter ? false : true}
                        startNumber={(page - 1) * 5}
                        users={filter ? filteredUsers.slice((page - 1) * 5, (page - 1) * 5 + 5) : usersByPage}
                        showAwards={false}
                        showToggle={false}
                        toggled={null}
                        changeToggled={() => {}}
                        reduced={false}
                        page={page}
                        showEdit={true}
                        message='no users found'
                        userEdited={userEdited}
                        changeUserEdited={setUserEdited}
                        showDelete={true}
                        userDeleted={userDeleted}
                        changeUserDeleted={setUserDeleted}
                        showRemove={false}
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

export default AllUsersPage