import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function TextInput({ label, showPlaceholder, placeholder, text, changeText, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const textInputRef = useRef(null)

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
                    type='text'
                    placeholder={showPlaceholder ? placeholder : false}
                    ref={textInputRef}
                    value={text}
                    onChange={(e) => changeText(e.target.value)}
                    onFocus={() => focus()}
                />
                {
                    error && 
                        <ErrorInput
                            input={textInputRef}
                            message={label + ' required'}
                            changeError={changeError}
                            style={styles.error}
                        />
                }
            </div>
        </div>
    )
}

export default TextInput