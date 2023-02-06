import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Keyboard, Dimensions } from 'react-native'
import { useRecoilState } from 'recoil'

import store from '../../store'
import Title from '../../components/title'
import InputText from '../../components/input/text'
import Button from '../../components/button'

function RegistrationPage() {
  const [, setLoggedIn] = useRecoilState(store.loggedIn)
  const [, setToken] = useRecoilState(store.token)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

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

  async function registration() {

  }

  function removeMessage() {
    setMessage(null)
  }

  return (
    <ScrollView>
      <View
        style={[styles.registrationPageWrapper, (keyboardVisible && styles.registrationPageWrapperWithKeyboard)]}
      >
        <View
          style={styles.registrationPageWindow}
        >
          <Title
            text='registration'
            style={styles.titleText}
          />
          <View
            style={styles.formRow}
          >
            <InputText
              removeMessage={removeMessage}
              password={false}
              showLabel={true}
              label='first name'
              text={firstName}
              changeText={setFirstName}
              placeholder={null}
              wrapperStyle={styles.inputWrapper}
              labelStyle={styles.labelText}
              inputStyle={styles.input}
            />
            <InputText
              removeMessage={removeMessage}
              password={false}
              showLabel={true}
              label='last name'
              text={lastName}
              changeText={setLastName}
              placeholder={null}
              wrapperStyle={styles.inputWrapper}
              labelStyle={styles.labelText}
              inputStyle={styles.input}
            />
          </View>
          <View
            style={styles.formRow}
          >
            <InputText
              removeMessage={removeMessage}
              password={false}
              showLabel={true}
              label='date of birth'
              text={dateOfBirth}
              changeText={setDateOfBirth}
              placeholder='DD/MM/YYYY'
              wrapperStyle={styles.inputWrapper}
              labelStyle={styles.labelText}
              inputStyle={styles.input}
            />
            <InputText
              removeMessage={removeMessage}
              password={false}
              showLabel={true}
              label='username'
              text={username}
              changeText={setUsername}
              placeholder={null}
              wrapperStyle={styles.inputWrapper}
              labelStyle={styles.labelText}
              inputStyle={styles.input}
            />
          </View>
          <View
            style={styles.formRow}
          >
            <InputText
              removeMessage={removeMessage}
              password={true}
              showLabel={true}
              label='password'
              text={password}
              changeText={setPassword}
              placeholder={null}
              wrapperStyle={styles.inputWrapper}
              labelStyle={styles.labelText}
              inputStyle={styles.input}
            />
            <InputText
              removeMessage={removeMessage}
              password={true}
              showLabel={true}
              label='re-password'
              text={rePassword}
              changeText={setRePassword}
              placeholder={null}
              wrapperStyle={styles.inputWrapper}
              labelStyle={styles.labelText}
              inputStyle={styles.input}
            />
          </View>
          <Button
            loading={loading}
            showMessage={true}
            messageText={message}
            work={registration}
            buttonText='submit'
            wrapperStyle={styles.buttonWrapper}
            buttonWrapperStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            messageWrapperStyle={[styles.message, styles.messageFail, ((message === null) && styles.hidden)]}
            messageTextStyle={styles.messageText}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  registrationPageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingBottom: 80,
    paddingLeft: 10,
    paddingRight: 10
  },
  registrationPageWrapperWithKeyboard: {
    justifyContent: 'flex-start',

    paddingTop: 20,

    paddingBottom: 0
  },
  registrationPageWindow: {
    width: '100%',

    padding: 20,

    backgroundColor: '#ffffff',

    borderRadius: 10,

    marginTop: 20,
    marginBottom: 20
  },

  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 35,
    textTransform: 'uppercase',
    textAlign: 'center',

    padding: 20
  },

  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputWrapper: {
    marginTop: 10,
    marginBottom: 10,

    width: '45%'
  },
  labelText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',

    marginBottom: 5,
    marginLeft: 10
  },
  input: {
    width: '100%',

    fontFamily: 'Ubuntu_400Regular',
    fontSize: 17,

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

export default RegistrationPage