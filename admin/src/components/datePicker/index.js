import styles from './style.module.css'

import leftIcon from '../../assets/icons/left.png'
import rightIcon from '../../assets/icons/right.png'

function DatePicker({ dateShow, date, setDate, disabled }) {
    function changeDate(value) {
        setDate(date + value*24*60*60*1000)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.arrow + ' ' + (disabled && styles.disabled)}
                onClick={disabled ? () => {} : () => changeDate(-1)}
            >
                <img
                    src={leftIcon}
                    alt='left arrow'
                />
            </div>
            <label
                className={styles.date}
            >
                {dateShow}
            </label>
            <div
                className={styles.arrow + ' ' + (disabled && styles.disabled)}
                onClick={disabled ? () => {} : () => changeDate(1)}
            >
                <img
                    src={rightIcon}
                    alt='right arrow'
                />
            </div>
        </div>
    )
}

export default DatePicker