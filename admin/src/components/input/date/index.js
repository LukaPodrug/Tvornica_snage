import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function DateInput({ label, date, changeDate, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const dateInputRef = useRef(null)

    function focus() {
        if(error) {
            changeError(false)
        }
        if(message) {
            changeMessage(null)
        }
        dateInputRef.current.showPicker()
    }

    return (
            <div
                className={styles.wrapper}
            >
                <label
                    className={labelStyle}
                >
                    {label}
                </label>
                <div
                    className={styles.field}
                >
                    <input
                        className={styles.input + ' ' + inputStyle + ' ' + (date && styles.visible)}
                        type='date'
                        ref={dateInputRef}
                        value={date}
                        onChange={(e) => changeDate(e.target.value)}
                        onFocus={() => focus()}
                        onClick={() => focus()}
                    />
                    {
                        error && 
                            <ErrorInput
                                input={dateInputRef}
                                message={label + ' required'}
                                changeError={changeError}
                                style={styles.error}
                            />
                    }
                </div>
            </div>
    )
}

export default DateInput