import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function DateInput({ label, showPlaceholder, placeholder, date, changeDate, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const dateInputRef = useRef(null)
    
    function focus() {
        if(error) {
            changeError(false)
        }
        if(message) {
            changeMessage(null)
        }
    }

    function dateUpdate(e) {
        if(e.target.value.length < 11) {
            changeDate(e.target.value)
            if((e.target.value.length === 2 || e.target.value.length === 5) && date.length < e.target.value.length) {
                dateInputRef.current.value = e.target.value + '/'
                changeDate(e.target.value)
            }
        }
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
                    className={styles.input + ' ' + inputStyle}
                    type='text'
                    placeholder={showPlaceholder ? placeholder : false}
                    ref={dateInputRef}
                    value={date}
                    onChange={(e) => dateUpdate(e)}
                    onFocus={() => focus()}
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