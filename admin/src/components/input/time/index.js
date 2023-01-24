import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function TimeInput({ label, time, changeTime, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const timeInputRef = useRef(null)

    function focus() {
        if(error) {
            changeError(false)
        }
        if(message) {
            changeMessage(null)
        }
        timeInputRef.current.showPicker()
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
                        className={styles.input + ' ' + inputStyle + ' ' + (time && styles.visible)}
                        type='time'
                        ref={timeInputRef}
                        value={time}
                        onChange={(e) => changeTime(e.target.value)}
                        onFocus={() => focus()}
                        onClick={() => focus()}
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