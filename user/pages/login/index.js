import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Keyboard, Dimensions } from 'react-native'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

import store from '../../store'
import LoadingPage from '../loading'
import Title from '../../components/title'
import InputText from '../../components/input/text'
import Button from '../../components/button'
import { loginAPI, verifyTokenAPI } from '../../API/REST/auth'

function LoginPage() {
  const [, setLoggedIn] = useRecoilState(store.loggedIn)
  const [, setToken] = useRecoilState(store.token)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const [tokenLoading, setTokenLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function verifyToken() {
      if(await AsyncStorage.getItem('token')) {
        try {
          const verifyTokenResponse = await verifyTokenAPI(await AsyncStorage.getItem('token'))
          setToken(verifyTokenResponse.headers.authorization)
          setLoggedIn(true)
          setTokenLoading(false)
        }
        catch(error) {
          setTokenLoading(false)
        }
      }
      else {
        setTokenLoading(false)
      }
    }

    verifyToken()
  }, [])

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
    if(username === '') {
      setMessage('username required')
      return
    }
    if(password === '') {
      setMessage('password required')
      return
    }
    setLoading(true)
    try {
      const loginResponse = await loginAPI(username, password)
      await AsyncStorage.setItem('token', loginResponse.headers.authorization)
      setToken(loginResponse.headers.authorization)
      setLoggedIn(true)
      setLoading(false)
    }
    catch(error) {
      setLoading(false)
      setMessage(error.response.data)
      return
    }
  }

  function removeMessage() {
    setMessage(null)
  }

  if(tokenLoading) {
    return (
      <LoadingPage
        style={styles.loadingPage}
      />
    )
  }

  return (
    <ScrollView>
      <View
        style={[styles.wrapper, (keyboardVisible && styles.wrapperWithKeyboard)]}
      >
        <View
          style={styles.window}
        >
          <Title
            text='login'
            textStyle={styles.titleText}
          />
          <InputText
            removeMessage={removeMessage}
            password={false}
            showLabel={true}
            label='username'
            text={username}
            changeText={setUsername}
            placeholder={null}
            wrapperStyle={styles.inputTextWrapper}
            labelTextStyle={styles.inputTextLabelText}
            inputTextStyle={styles.inputTextInputText}
          />
          <InputText
            removeMessage={removeMessage}
            password={true}
            showLabel={true}
            label='password'
            text={password}
            changeText={setPassword}
            placeholder={null}
            wrapperStyle={styles.inputTextWrapper}
            labelTextStyle={styles.inputTextLabelText}
            inputTextStyle={styles.inputTextInputText}
          />
          <Button
            loading={loading}
            showMessage={true}
            messageText={message}
            work={loading ? () => {} : login}
            buttonText='submit'
            wrapperStyle={styles.buttonAndMessageWrapper}
            buttonWrapperStyle={styles.buttonWrapper}
            buttonTextStyle={styles.buttonText}
            messageWrapperStyle={[styles.messageWrapper, styles.messageFailWrapper, ((message === null) && styles.messageHiddenWrapper)]}
            messageTextStyle={styles.messageText}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingPage: {
    paddingBottom: 80
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingBottom: 80,
    paddingLeft: 10,
    paddingRight: 10
  },
  wrapperWithKeyboard: {
    justifyContent: 'flex-start',

    paddingTop: 20,
    paddingBottom: 0
  },

  window: {
    width: '100%',

    padding: 20,

    backgroundColor: '#e6e6e6',

    borderRadius: 10
  },

  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 35,
    textTransform: 'uppercase',
    textAlign: 'center',

    padding: 20
  },

  inputTextWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputTextLabelText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textTransform: 'uppercase',

    marginBottom: 5,
    marginLeft: 10
  },
  inputTextInputText: {
    width: '100%',

    fontFamily: 'Ubuntu_400Regular',
    fontSize: 20,

    padding: 10,

    backgroundColor: '#ffffff',

    borderRadius: 10
  },

  buttonAndMessageWrapper: {
    marginTop: 20,
  },
  buttonWrapper: {
    padding: 10,

    borderRadius: 10,

    backgroundColor: '#e04f5f',

    minHeight: 42
  },
  buttonText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  messageWrapper: {
    marginTop: 15,

    padding: 10,

    borderRadius: 10
  },
  messageFailWrapper: {
    backgroundColor: '#e04f5f'
  },
  messageHiddenWrapper: {
    opacity: 0
  },
  messageText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#ffffff'
  }
})

export default LoginPage