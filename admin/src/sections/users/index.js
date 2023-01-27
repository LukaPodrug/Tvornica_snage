import User from '../../components/user'
import styles from './style.module.css'

function UsersSection({ users, showToggle, toggled, changeToggled, reduced, page, showEdit, message, userEdited, changeUserEdited, showDelete, removeReservation, maxUsers, style }) {
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
                            dateOfBirth={user.dateOfBirth}
                            membership={user.membership}
                            level={user.level}
                            reduced={reduced}
                            toggled={toggled && toggled[index]}
                            changeToggled={changeToggled}
                            showToggle={showToggle}
                            showEdit={showEdit}
                            showDelete={showDelete}
                            remove={removeReservation}
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