import moment from 'moment'

import User from '../../components/user'
import styles from './style.module.css'

function UsersSection({ showNumber, startNumber, users, showAwards, showToggle, toggled, changeToggled, reduced, page, showEdit, message, userEdited, changeUserEdited, showDelete, userDeleted, changeUserDeleted, showRemove, removeReservation, showAdd, addUser, maxUsers, style }) {
    return (
        <div
            className={styles.wrapper + ' ' + style}
        >
        {
            users.length === 0 ?
                <label
                    className={styles.message}
                >
                    {message}
                </label>
                :
                users.map((user, index) => {
                    return (
                        <User
                            key={index}
                            showNumber={showNumber}
                            number={startNumber + index + 1}
                            id={user.id}
                            image={user.image}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            dateOfBirth={user.dateOfBirth === null ? 'unknown' : moment(user.dateOfBirth).format('DD/MM/YYYY')}
                            membership={moment(user.membership).format('DD/MM/YYYY')}
                            level={user.level}
                            reduced={reduced}
                            showAwards={showAwards}
                            reservationsDone={user.reservationsDone}
                            reservationsSkipped={user.reservationsSkipped}
                            unannouncedDone={user.nonReservationsDone}
                            toggled={toggled && toggled[index]}
                            changeToggled={changeToggled}
                            showToggle={showToggle}
                            showEdit={showEdit}
                            showDelete={showDelete}
                            showRemove={showRemove}
                            remove={removeReservation}
                            showAdd={showAdd}
                            add={addUser}
                            index={index + (page - 1) * maxUsers}
                            userEdited={userEdited}
                            changeUserEdited={changeUserEdited}
                            userDeleted={userDeleted}
                            changeUserDeleted={changeUserDeleted}
                        />
                    )
                })
        }
        </div>
    )
}

export default UsersSection