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
                <div
                    className={styles.info}
                >
                    <div
                        className={styles.key}
                    >
                        first name
                    </div>
                    <div 
                        className={styles.value}
                    >
                        {firstName}
                    </div>
                </div>
                <div
                    className={styles.info}
                >
                    <div
                        className={styles.key}
                    >
                        last name
                    </div>
                    <div 
                        className={styles.value}
                    >
                        {lastName}
                    </div>
                </div>
                <div
                    className={styles.info}
                >
                    <div
                        className={styles.key}
                    >
                        username
                    </div>
                    <div 
                        className={styles.value}
                    >
                        {username}
                    </div>
                </div>
                <div
                    className={styles.info}
                >
                    <div
                        className={styles.key}
                    >
                        date of birth
                    </div>
                    <div 
                        className={styles.value}
                    >
                        {dateOfBirth}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile