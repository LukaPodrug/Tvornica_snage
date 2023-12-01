import UsersSection from '../../users'
import styles from './style.module.css'

function ReservationsSection({ users, toggled, changeToggled, page }) {
    return (
        <UsersSection
            showNumber={false}
            startNumber={null}
            users={users}
            showAwards={false}
            showToggle={true}
            toggled={toggled}
            changeToggled={changeToggled}
            reduced={true}
            page={page}
            message='no reservations for this training'
            showEdit={false}
            userEdited={null}
            changeUserEdited={null}
            showRemove={false}
            removeReservation={null}
            showAdd={false}
            add={null}
            maxUsers={10}
            style={styles.wrapper}
        />
    )
}

export default ReservationsSection