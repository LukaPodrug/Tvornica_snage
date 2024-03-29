import { useState } from 'react'

import Button from '../../../components/button'
import UsersSection from '../../users'
import AddUserModal from '../../../pages/modals/user/add'

import styles from './style.module.css'

function UnannouncedSection({ allUsers, users, page, removeReservation, reservationEdited, changeReservationEdited, trainingId }) {
    const [addUserModalOpen, setAddUserModalOpen] = useState(false)
    
    return (
        <>
            <Button
                disabled={false}
                text='add new'
                method={() => setAddUserModalOpen(true)}
                loading={false}
                showMessage={false}
                message={null}
                changeMessage={() => {}}
                buttonStyle={styles.button}
                messageStyle={null}
            />
            <UsersSection
                showNumber={false}
                startNumber={null}
                users={users}
                showAwards={false}
                showToggle={false}
                toggled={null}
                changeToggled={null}
                reduced={true}
                page={page}
                message='no unannounced for this training'
                showEdit={false}
                userEdited={null}
                changeUserEdited={null}
                showDelete={false}
                userDeleted={null}
                changeUserDeleted={() => {}}
                showRemove={true}
                removeReservation={removeReservation}
                showAdd={false}
                add={null}
                maxUsers={8}
                style={styles.wrapper}
            />
            <AddUserModal
                isOpen={addUserModalOpen}
                changeIsOpen={setAddUserModalOpen}
                userAdded={reservationEdited}
                changeUserAdded={changeReservationEdited}
                disabledUsers={allUsers}
                trainingId={trainingId}
            />
        </>
    )
}

export default UnannouncedSection