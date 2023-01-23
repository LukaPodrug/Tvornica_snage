import Button from '../../../components/button'
import DatePicker from '../../../components/datePicker'
import styles from './style.module.css'

function Header({ dateShow, date, setDate }) {
    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.header}
            >
                <label
                    className={styles.text}
                >
                    all trainings
                </label>
                <Button
                    text='add new'
                    method={() => {}}
                    loading={false}
                    showMessage={false}
                    message={null}
                    changeMessage={null}
                    style={styles.button}
                />
            </div>
            <DatePicker
                dateShow={dateShow}
                date={date}
                setDate={setDate}
            />
        </div>
    )
}

export default Header