import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function TextareaInput({ label, text, changeText, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const textareaInputRef = useRef(null)

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
                <textarea
                    className={styles.input + ' ' + inputStyle}
                    type='text'
                    rows={10}
                    ref={textareaInputRef}
                    value={text}
                    onChange={(e) => changeText(e.target.value)}
                    onFocus={() => focus()}
                />
                {
                    error && 
                        <ErrorInput
                            input={textareaInputRef}
                            message={label + ' required'}
                            changeError={changeError}
                            style={styles.error}
                        />
                }
            </div>
        </div>
    )
}

export default TextareaInput