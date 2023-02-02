import { useEffect, useState } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'

import Title from '../../components/title'
import InputText from '../../components/input/text'
import Button from '../../components/button'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [message, setMessage] = useState(null)

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

  }

  return (
    <View
      style={[styles.loginPageWrapper, {paddingBottom: keyboardVisible ? 0 : 80}]}
    >
      <View
        style={styles.loginPageWindow}
      >
        <Title
          text='login'
          style={styles.titleText}
        />
        <InputText
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
          showMessage={message}
          messageText={message}
          work={login}
          buttonText='submit'
          wrapperStyle={styles.buttonWrapper}
          buttonWrapperStyle={styles.button}
          buttonTextStyle={styles.buttonText}
          messageWrapperStyle={styles.message}
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

    flexGrow: 1,

    backgroundColor: '#000000'
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

  },
  button: {
    marginTop: 20,
    marginBottom: 30,

    padding: 10,

    borderRadius: 10,

    backgroundColor: '#90ee90'
  },
  buttonText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  message: {

  },
  messageText: {

  }
})

export default LoginPage