import User from '../../components/user'
import styles from './style.module.css'

function UsersSection({ users, toggled, changeToggled, reduced, page, message, userEdited, changeUserEdited }) {
    return (
        <div
            className={styles.wrapper}
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
                            toggled={toggled[index]}
                            changeToggled={changeToggled}
                            showToggle={true}
                            showEdit={false}
                            index={index + (page - 1) * 5}
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