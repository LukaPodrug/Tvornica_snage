import { useState } from 'react'

import TextInput from '../../components/input/text'
import PasswordInput from '../../components/input/password'
import Button from '../../components/button'
import styles from './style.module.css'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    function login() {
        if(username === '') {
            setUsernameError(true)
        }
        if(password === '') {
            setPasswordError(true)
        }
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.window}
            >
                <div
                    className={styles.header}
                >
                    LOGIN
                </div>
                <form
                    className={styles.form}
                >
                    <div
                        className={styles.inputs}
                    >
                        <div
                            className={styles.field}
                        >
                            <TextInput
                                label='username'
                                text={username}
                                changeText={setUsername}
                                error={usernameError}
                                changeError={setUsernameError}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                            />
                        </div>
                        <div
                            className={styles.field}
                        >
                            <PasswordInput
                                label='password'
                                text={password}
                                changeText={setPassword}
                                error={passwordError}
                                changeError={setPasswordError}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                            />
                        </div>
                    </div>
                    <Button
                        text='submit'
                        method={() => login()}
                        style={styles.button}
                    />
                </form>
            </div>
        </div>
    )
}

export default LoginPage