import DataSectionInfo from './info'
import styles from './style.module.css'

function DataSection({ image, firstName, lastName, username, dateOfBirth }) {
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
                <DataSectionInfo
                    property='first name'
                    value={firstName}
                />
                <DataSectionInfo
                    property='last name'
                    value={lastName}
                />
                <DataSectionInfo
                    property='username'
                    value={username}
                />
                <DataSectionInfo
                    property='date of birth'
                    value={dateOfBirth}
                />
            </div>
        </div>
    )
}

export default DataSection