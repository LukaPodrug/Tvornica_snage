import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function PasswordInput({ label, text, changeText, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const passwordInputRef = useRef(null)

    function focus() {
        if(error) {
            changeError(false)
        }
        if(message) {
            changeMessage(null)
        }
    }

    return (
        <>
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
                    type='password'
                    ref={passwordInputRef}
                    value={text}
                    onChange={(e) => changeText(e.target.value)}
                    onFocus={() => focus()}
                />
                {
                    error && 
                        <ErrorInput
                            input={passwordInputRef}
                            message={label + ' required'}
                            changeError={changeError}
                            style={styles.error}
                        />
                }
            </div>
        </>
    )
}

export default PasswordInput