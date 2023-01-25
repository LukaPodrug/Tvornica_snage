import { useState } from 'react'
import { useRecoilState } from 'recoil'

import store from '../../store'
import TextInput from '../../components/input/text'
import PasswordInput from '../../components/input/password'
import Button from '../../components/button'
import { loginAPI } from '../../API/auth'
import styles from './style.module.css'

function LoginPage() {
    const [, setLoggedIn] = useRecoilState(store.loggedIn)
    const [, setToken] = useRecoilState(store.token)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    async function login() {
        if(username === '') {
            setUsernameError(true)
        }
        if(password === '') {
            setPasswordError(true)
        }
        if(username !== '' && password !== '') {
            setLoading(true)
            try {
                const loginResponse = await loginAPI(username, password)
                setLoading(false)
                setLoggedIn(true)
                setToken(loginResponse.headers.authorization)
                localStorage.setItem('token', loginResponse.headers.authorization)
            }
            catch(error) {
                setLoading(false)
                setMessage(error.response.data)
            }
        }
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.window}
            >
                <label
                    className={styles.header}
                >
                    login
                </label>
                <form
                    className={styles.form}
                >
                    <div
                        className={styles.inputs}
                    >
                        <TextInput
                            label='username'
                            showPlaceholder={false}
                            placeholder=''
                            text={username}
                            changeText={setUsername}
                            error={usernameError}
                            changeError={setUsernameError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <PasswordInput
                            label='password'
                            text={password}
                            changeText={setPassword}
                            error={passwordError}
                            changeError={setPasswordError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                    </div>
                    <Button
                        text='submit'
                        method={() => login()}
                        loading={loading}
                        showMessage={true}
                        message={message}
                        changeMessage={setMessage}
                        buttonStyle={styles.button}
                        messageStyle={styles.message}
                    />
                </form>
            </div>
        </div>
    )
}

export default LoginPage