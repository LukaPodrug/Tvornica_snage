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
    const [usersLoading, setUsersLoading] = useState(true)

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
            setTimeout(() => {
                setUsersLoading(false)
            }, 500)
        }

        if(firstName === '' && lastName === '') {
            fetchAPI()
        }
    }, [page, userEdited, firstName, lastName])

    useEffect(() => {
        if(firstName === '' && lastName === '') {
            setFilter(false)
            setPage(1)
        }
    }, [firstName, lastName])

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
            setTimeout(() => {
                setUsersLoading(false)
            }, 500)
        }

        if(filter) {
            fetchAPI()
        }
    }, [userEdited])

    async function searchByFirstNameAndLastName() {
        try {
            setPage(1)
            setFilter(true)
            setUsersLoading(true)
            const searchByFirstNameAndLastNameResponse = await getUsersByFirstNameAndLastNameAPI(token, firstName, lastName)
            setFilteredUsers(searchByFirstNameAndLastNameResponse.data)
            setMaxPage(Math.ceil(searchByFirstNameAndLastNameResponse.data.length / 5))
            setTimeout(() => {
                setUsersLoading(false)
            }, 500)
        }
        catch(error) {
            setTimeout(() => {
                setUsersLoading(false)
            }, 500)
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
            />
        </>
    )
}

export default AllUsersPage