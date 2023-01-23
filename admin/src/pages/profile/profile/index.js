import Info from './info'

import styles from './style.module.css'

function Profile({ image, firstName, lastName, username, dateOfBirth }) {
    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.image}
            >
                <img
                    src={image}
                    alt='profile'
                />
            </div>
            <div
                className={styles.data}
            >
                <Info
                    property='first name'
                    value={firstName}
                />
                <Info
                    property='last name'
                    value={lastName}
                />
                <Info
                    property='username'
                    value={username}
                />
                <Info
                    property='date of birth'
                    value={dateOfBirth}
                />
            </div>
        </div>
    )
}

export default Profile