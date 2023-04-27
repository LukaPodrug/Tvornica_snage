import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function TimeInput({ label, showPlaceholder, placeholder, time, changeTime, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const timeInputRef = useRef(null)
    
    function focus() {
        if(error) {
            changeError(false)
        }
        if(message) {
            changeMessage(null)
        }
    }

    function timeUpdate(e) {
        if(e.target.value.length < 6) {
            changeTime(e.target.value)
            if(e.target.value.length === 2 && time.length < e.target.value.length) {
                timeInputRef.current.value = e.target.value + ':'
                changeTime(e.target.value)
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
                    ref={timeInputRef}
                    value={time}
                    onChange={(e) => timeUpdate(e)}
                    onFocus={() => focus()}
                />
                {
                    error && 
                        <ErrorInput
                            input={timeInputRef}
                            message={label + ' required'}
                            changeError={changeError}
                            style={styles.error}
                        />
                }
            </div>
        </div>
    )
}

export default TimeInput