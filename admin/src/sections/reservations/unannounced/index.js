import Button from '../../../components/button'
import UsersSection from '../../users'
import styles from './style.module.css'

function UnannouncedSection({ users, page, removeReservation }) {
    return (
        <>
            <Button
                disabled={false}
                text='add new'
                method={() => {}}
                loading={false}
                showMessage={false}
                message={null}
                changeMessage={() => {}}
                buttonStyle={styles.button}
                messageStyle={null}
            />
            <UsersSection
                users={users}
                showToggle={false}
                toggled={null}
                changeToggled={null}
                reduced={true}
                page={page}
                message='no unannounced for this training'
                showEdit={false}
                userEdited={null}
                changeUserEdited={null}
                showDelete={true}
                removeReservation={removeReservation}
                maxUsers={8}
                style={styles.wrapper}
            />
        </>
    )
}

export default UnannouncedSection