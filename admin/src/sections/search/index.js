import TextInput from '../../components/input/text'
import Button from '../../components/button'
import styles from './style.module.css'

function Search({ firstName, changeFirstName, lastName, changeLastName, search }) {
    return (
        <div
            className={styles.wrapper}
        >
            <TextInput
                label='first name'
                showPlaceholder={false}
                placeholder={null}
                text={firstName}
                changeText={changeFirstName}
                error={null}
                changeError={() => {}}
                message={null}
                changeMessage={() => {}}
                labelStyle={styles.label}
                inputStyle={styles.input}
            />
            <TextInput
                label='last name'
                showPlaceholder={false}
                placeholder={null}
                text={lastName}
                changeText={changeLastName}
                error={null}
                changeError={() => {}}
                message={null}
                changeMessage={() => {}}
                labelStyle={styles.label}
                inputStyle={styles.input}
            />
            <Button
                disabled={false}
                text='search'
                method={() => search()}
                loading={false}
                showMessage={false}
                message={null}
                changeMessage={() => {}}
                buttonStyle={styles.button}
                messageStyle={null}
            />
        </div>
    )
}

export default Search