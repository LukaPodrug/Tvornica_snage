import { useState } from 'react'

import Section from '../section'
import SwitchInput from '../input/switch'
import EditUserModal from '../../pages/modals/user/edit'
import DeleteUserModal from '../../pages/modals/user/delete'
import styles from './style.module.css'

import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/delete.png'
import removeIcon from '../../assets/icons/remove.png'
import addIcon from '../../assets/icons/add.png'

function User({ showNumber, number, id, image, firstName, lastName, dateOfBirth, membership, level, reduced, showAwards, reservationsDone, reservationsSkipped, unannouncedDone, toggled, changeToggled, showToggle, showEdit, showDelete, showRemove, remove, showAdd, add, index, userEdited, changeUserEdited, userDeleted, changeUserDeleted }) {
    const [editUserDetailsModalOpen, setEditUserDetailsModalOpen] = useState(false)
    const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false)

    return (
        <div 
            className={styles.wrapper}
        >
            <div className={styles.data}>
                {
                    showNumber && 
                        <Section
                            id={null}
                            image={null}
                            property='#'
                            value={number}
                            button={false}
                            showText={true}
                            openModal={null}
                            remove={null}
                            add={null}
                        />
                }
                <Section
                    id={null}
                    image={image}
                    property='user'
                    value={null}
                    button={false}
                    showText={false}
                    openModal={null}
                    remove={null}
                    add={null}
                />
                <Section
                    id={null}
                    image={null}
                    property='id'
                    value={id}
                    button={false}
                    showText={true}
                    openModal={null}
                    remove={null}
                    add={null}
                />
                <div
                    className={styles.name}
                >
                    <Section
                        id={null}
                        image={null}
                        property='first name'
                        value={firstName}
                        button={false}
                        showText={true}
                        openModal={null}
                        remove={null}
                        add={null}
                    />
                </div>
                <div
                    className={styles.name}
                >
                    <Section
                        id={null}
                        image={null}
                        property='last name'
                        value={lastName}
                        button={false}
                        showText={true}
                        openModal={null}
                        remove={null}
                        add={null}
                    />
                </div>
                {
                    !reduced &&
                        <>
                            <Section
                                id={null}
                                image={null}
                                property='date of birth'
                                value={dateOfBirth}
                                button={false}
                                showText={true}
                                openModal={null}
                                remove={null}
                                add={null}
                            />
                            <Section
                                id={null}
                                image={null}
                                property='membership'
                                value={membership}
                                button={false}
                                showText={true}
                                openModal={null}
                                remove={null}
                                add={null}
                            />
                            <Section
                                id={null}
                                image={null}
                                property='level'
                                value={level}
                                button={false}
                                showText={true}
                                openModal={null}
                                remove={null}
                                add={null}
                            />
                        </>
                }
                {
                    showAwards &&
                        <>
                            <Section
                                id={null}
                                image={null}
                                property='done'
                                value={reservationsDone}
                                button={false}
                                showText={true}
                                openModal={null}
                                remove={null}
                                add={null}
                            />
                            <Section
                                id={null}
                                image={null}
                                property='skipped'
                                value={reservationsSkipped}
                                button={false}
                                showText={true}
                                openModal={null}
                                remove={null}
                                add={null}
                            />
                            <Section
                                id={null}
                                image={null}
                                property='extra'
                                value={unannouncedDone}
                                button={false}
                                showText={true}
                                openModal={null}
                                remove={null}
                                add={null}
                            />
                        </>
                }
            </div>
            {
                showToggle &&
                    <SwitchInput
                        switchedOn={toggled}
                        changeSwitchedOn={changeToggled}
                        index={index}
                    />
            }
            {
                showEdit &&
                    <Section
                        id={null}
                        image={editIcon}
                        property={null}
                        value={null}
                        button={true}
                        showText={false}
                        openModal={setEditUserDetailsModalOpen}
                        remove={null}
                        add={null}
                    />
            }
            {
                showDelete &&
                    <Section
                        id={null}
                        image={deleteIcon}
                        property={null}
                        value={null}
                        button={true}
                        showText={false}
                        openModal={setDeleteUserModalOpen}
                        remove={null}
                        add={null}
                    />
            }
            {
                showRemove &&
                    <Section
                        id={id}
                        image={removeIcon}
                        property={null}
                        value={null}
                        button={true}
                        showText={false}
                        openModal={null}
                        remove={remove}
                        add={null}
                    />
            }
            {
                showAdd &&
                    <Section
                        id={id}
                        image={addIcon}
                        property={null}
                        value={null}
                        button={true}
                        showText={false}
                        openModal={null}
                        remove={null}
                        add={add}
                    />
            }
            {
                editUserDetailsModalOpen &&
                    <EditUserModal
                        isOpen={true}
                        changeIsOpen={setEditUserDetailsModalOpen}
                        id={id}
                        image={image}
                        firstName={firstName}
                        lastName={lastName}
                        membershipOld={membership}
                        levelOld={level}
                        userEdited={userEdited}
                        changeUserEdited={changeUserEdited}
                    />
            }
            {
                deleteUserModalOpen &&
                    <DeleteUserModal
                        isOpen={true}
                        changeIsOpen={setDeleteUserModalOpen}
                        id={id}
                        userDeleted={userDeleted}
                        changeUserDeleted={changeUserDeleted}
                    />
            }
        </div>
    )
}

export default User