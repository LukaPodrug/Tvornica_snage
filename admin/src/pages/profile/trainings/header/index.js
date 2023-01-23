import DatePicker from '../../../../components/datePicker'
import styles from './style.module.css'

function Header({ dateShow, date, setDate }) {
    return (
        <div
            className={styles.wrapper}
        >
            <label
                className={styles.header}
            >
                my trainings
            </label>
            <DatePicker
                dateShow={dateShow}
                date={date}
                setDate={setDate}
            />
        </div>
    )
}

export default Header