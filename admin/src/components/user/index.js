import { useState } from 'react'

import Section from '../section'
import SwitchInput from '../input/switch'
import styles from './style.module.css'

import editIcon from '../../assets/icons/edit.png'

function User({ id, image, firstName, lastName, dateOfBirth, membership, level, reduced, toggled, changeToggled, showToggle, showEdit, index }) {
    const [editUserDetailsModalOpen, setEditUserDetailsModalOpen] = useState(false)

    return (
        <div 
            className={styles.wrapper}
        >
            <div className={styles.data}>
                <Section
                    image={image}
                    property={null}
                    value={null}
                    button={false}
                    showText={false}
                    openModal={null}
                />
                <Section
                    image={null}
                    property='first name'
                    value={firstName}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                <Section
                    image={null}
                    property='last name'
                    value={lastName}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                {
                    !reduced &&
                        <>
                            <Section
                                image={null}
                                property='date of birth'
                                value={dateOfBirth}
                                button={false}
                                showText={true}
                                openModal={null}
                            />
                            <Section
                                image={null}
                                property='membership'
                                value={membership}
                                button={false}
                                showText={true}
                                openModal={null}
                            />
                            <Section
                                image={null}
                                property='level'
                                value={level}
                                button={false}
                                showText={true}
                                openModal={null}
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
                        image={editIcon}
                        property={null}
                        value={null}
                        button={true}
                        showText={false}
                        openModal={setEditUserDetailsModalOpen}
                    />
            }
        </div>
    )
}

export default User