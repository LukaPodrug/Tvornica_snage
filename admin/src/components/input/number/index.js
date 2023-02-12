import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function NumberInput({ label, number, changeNumber, error, changeError, message, changeMessage, lowLimit, labelStyle, inputStyle }) {
    const numberInputRef = useRef(null)

    function focus() {
        if(error) {
            changeError(false)
        }
        if(message) {
            changeMessage(null)
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
                    type='number'
                    ref={numberInputRef}
                    value={number}
                    onChange={(e) => changeNumber(parseInt(e.target.value))}
                    onFocus={() => focus()}
                    min={lowLimit}
                />
                {
                    error && 
                        <ErrorInput
                            input={numberInputRef}
                            message={label + ' required'}
                            changeError={changeError}
                            style={styles.error}
                        />
                }
            </div>
        </div>
    )
}

export default NumberInput