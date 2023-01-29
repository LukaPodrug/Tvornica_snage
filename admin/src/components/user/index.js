import { useState } from 'react'

import Section from '../section'
import SwitchInput from '../input/switch'
import EditUserModal from '../../pages/modals/user/edit'
import styles from './style.module.css'

import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/delete.png'
import addIcon from '../../assets/icons/add.png'

function User({ id, image, firstName, lastName, dateOfBirth, membership, level, reduced, showAwards, reservationsDone, reservationsSkipped, unannouncedDone, toggled, changeToggled, showToggle, showEdit, showDelete, remove, showAdd, add, index, userEdited, changeUserEdited }) {
    const [editUserDetailsModalOpen, setEditUserDetailsModalOpen] = useState(false)

    return (
        <div 
            className={styles.wrapper}
        >
            <div className={styles.data}>
                <Section
                    id={null}
                    image={image}
                    property={null}
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
                    property='first name'
                    value={firstName}
                    button={false}
                    showText={true}
                    openModal={null}
                    remove={null}
                    add={null}
                />
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
                        id={id}
                        image={deleteIcon}
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
        </div>
    )
}

export default User