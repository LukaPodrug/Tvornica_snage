import { useEffect, useState } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import { useRecoilState } from 'recoil'

import store from '../../store'
import Title from '../../components/title'
import InputText from '../../components/input/text'
import Button from '../../components/button'
import { loginAPI } from '../../API/auth'

function LoginPage() {
  const [, setLoggedIn] = useRecoilState(store.loggedIn)
  const [, setToken] = useRecoilState(store.token)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', () => {
        setKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', () => {
        setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  async function login() {
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
        console.log(error)
        setLoading(false)
        setMessage(error.response.data)
      }
    }
  }

  function removeMessage() {
    setMessage(null)
  }

  return (
    <View
      style={[styles.loginPageWrapper, (keyboardVisible && styles.loginPageWrapperWithKeyboard)]}
    >
      <View
        style={styles.loginPageWindow}
      >
        <Title
          text='login'
          style={styles.titleText}
        />
        <InputText
          removeMessage={removeMessage}
          password={false}
          showLabel={true}
          label='username'
          text={username}
          changeText={setUsername}
          wrapperStyle={styles.inputWrapper}
          labelStyle={styles.labelText}
          inputStyle={styles.input}
        />
        <InputText
          removeMessage={removeMessage}
          password={true}
          showLabel={true}
          label='password'
          text={password}
          changeText={setPassword}
          wrapperStyle={styles.inputWrapper}
          labelStyle={styles.labelText}
          inputStyle={styles.input}
        />
        <Button
          loading={loading}
          showMessage={true}
          messageText={message}
          work={login}
          buttonText='submit'
          wrapperStyle={styles.buttonWrapper}
          buttonWrapperStyle={styles.button}
          buttonTextStyle={styles.buttonText}
          messageWrapperStyle={[styles.message, styles.messageFail, ((message === null) && styles.hidden)]}
          messageTextStyle={styles.messageText}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginPageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: '100%',

    backgroundColor: '#000000',

    paddingBottom: 80
  },
  loginPageWrapperWithKeyboard: {
    justifyContent: 'flex-start',

    paddingTop: 20,

    paddingBottom: 0
  },
  loginPageWindow: {
    width: '100%',

    padding: 20,

    backgroundColor: '#ffffff',

    borderRadius: 10
  },

  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 35,
    textTransform: 'uppercase',
    textAlign: 'center',

    padding: 20
  },

  inputWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  labelText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textTransform: 'uppercase',

    marginBottom: 5,
    marginLeft: 10
  },
  input: {
    width: '100%',

    fontFamily: 'Ubuntu_400Regular',
    fontSize: 20,

    padding: 10,

    backgroundColor: '#e6e6e6',

    borderRadius: 10
  },

  buttonWrapper: {
    marginTop: 20,
  },
  button: {
    padding: 10,

    borderRadius: 10,

    backgroundColor: '#90ee90',

    minHeight: 42
  },
  buttonText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  message: {
    marginTop: 15,

    padding: 10,

    borderRadius: 10
  },
  messageFail: {
    backgroundColor: '#e04f5f'
  },
  messageText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#ffffff'
  },
  hidden: {
    opacity: 0
  }
})

export default LoginPage