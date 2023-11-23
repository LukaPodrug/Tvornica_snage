import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import LoadingSection from '../../../../sections/loading'
import ModalHeader from '../../../../sections/modals/header'
import UsersSection from '../../../../sections/users'
import Pagination from '../../../../components/pagination'
import { getUsersByFirstNameAndLastNameAPI } from '../../../../API/user'
import { addunannouncedCompletionAPI } from '../../../../API/reservation'
import Search from '../../../../sections/search'

import styles from './style.module.css'

function AddUserModal({ isOpen, changeIsOpen, userAdded, changeUserAdded, disabledUsers, trainingId }) {
    const [token] = useRecoilState(store.token)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const [usersLoading, setUsersLoading] = useState(false)

    function closeModal() {
        changeIsOpen(false)
        clearForm()
    }

    function clearForm() {
        setFirstName('')
        setLastName('')
        setPage(1)
        setFilteredUsers([])
    }

    async function searchByFirstNameAndLastName() {
        try {
            setUsersLoading(true)
            const searchByFirstNameAndLastNameResponse = await getUsersByFirstNameAndLastNameAPI(token, firstName, lastName)
            const filteredUsersHelp = []
            searchByFirstNameAndLastNameResponse.data.forEach(user => {
                let disabled = false
                disabledUsers.forEach(disabledUser => {
                    if(user.id === disabledUser.id) {
                        disabled = true
                    }
                })
                if(!disabled) {
                    filteredUsersHelp.push(user)
                }
            })
            setFilteredUsers(filteredUsersHelp)
            setMaxPage(Math.ceil(filteredUsersHelp.length / 10))
            setUsersLoading(false)
        }
        catch(error) {
            setUsersLoading(false)
            return
        }
    }

    async function addUnannouncedCompletion(id) {
        try {
            await addunannouncedCompletionAPI(token, trainingId, id)
            changeUserAdded(!userAdded)
        }
        catch(error) {
            return
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <div
                className={styles.wrapper}
            >
                <ModalHeader
                    title='add reservation'
                    closeModal={closeModal}
                />
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
                            showNumber={false}
                            startNumber={null}
                            users={filteredUsers.slice((page - 1) * 10, (page - 1) * 10 + 10)}
                            showAwards={false}
                            showToggle={false}
                            toggled={null}
                            changeToggled={() => {}}
                            reduced={true}
                            page={page}
                            showEdit={false}
                            message='no users found'
                            userEdited={false}
                            changeUserEdited={() => {}}
                            showDelete={false}
                            removeReservation={() => {}}
                            showAdd={true}
                            addUser={addUnannouncedCompletion}
                            maxUsers={10}
                            style={styles.users}
                        />
                }
                <Pagination
                    page={page}
                    changePage={setPage}
                    maxPage={maxPage}
                    disabled={usersLoading}
                />
            </div>
        </Modal>
    )
}

export default AddUserModal