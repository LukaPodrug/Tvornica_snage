import { useRef } from 'react'

import ErrorInput from '../error'
import styles from './style.module.css'

function DropdownInput({ label, person, program, choices, value, changeValue, error, changeError, message, changeMessage, labelStyle, inputStyle }) {
    const dropdownInputRef = useRef(null)

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
                className={styles.field + ' ' + inputStyle}
            >
                <select
                    className={styles.input}
                    ref={dropdownInputRef}
                    value={value}
                    onChange={(e) => changeValue(parseInt(e.target.value))}
                    onFocus={() => focus()}
                >
                    <option 
                        disabled={true}
                        selected={true}
                        value=''
                    /> 
                    {
                        choices.map((choice, index) => {
                            return (
                                <option
                                    key={index}
                                    value={choice.id}
                                >
                                    {
                                        person &&
                                            <>
                                                {choice.firstName} {choice.lastName}
                                            </>
                                    }
                                    {
                                        program &&
                                            <>
                                                {choice.name}
                                            </>
                                    }
                                    {
                                        (!person && !program) &&
                                            <>
                                                {choice}
                                            </>
                                    }
                                </option>
                            )
                        })
                    }
                </select>
                {
                    error && 
                        <ErrorInput
                            input={dropdownInputRef}
                            message={label + ' required'}
                            changeError={changeError}
                            style={styles.error}
                        />
                }
            </div>
        </div>
    )
}

export default DropdownInput