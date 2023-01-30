import moment from 'moment'

import User from '../../components/user'
import styles from './style.module.css'

function UsersSection({ users, showAwards, showToggle, toggled, changeToggled, reduced, page, showEdit, message, userEdited, changeUserEdited, showDelete, removeReservation, showAdd, addUser, maxUsers, style }) {
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
                            id={user.id}
                            image={user.image}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            dateOfBirth={moment(user.dateOfBirth).format('DD/MM/YYYY')}
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
                            remove={removeReservation}
                            showAdd={showAdd}
                            add={addUser}
                            index={index + (page - 1) * maxUsers}
                            userEdited={userEdited}
                            changeUserEdited={changeUserEdited}
                        />
                    )
                })
        }
        </div>
    )
}

export default UsersSection