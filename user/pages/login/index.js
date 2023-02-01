import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View
      style={styles.wrapper}
    >
      <View
        style={styles.window}
      >
        <Text
          style={styles.title}
        >
          login
        </Text>
        <View
          style={styles.field}
        >
          <Text
            style={styles.label}
          >
            username
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
          />
        </View>
        <View
          style={styles.field}
        >
          <Text
            style={styles.label}
          >
            password
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
        >
          <Text
            style={styles.buttonText}
          >
            submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 10,

    flexGrow: 1,

    backgroundColor: '#000000'
  },
  window: {
    width: '100%',

    padding: 20,

    backgroundColor: '#ffffff',

    borderRadius: 10
  },
  title: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 35,
    textTransform: 'uppercase',
    textAlign: 'center',

    padding: 20
  },
  field: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
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
  }
})

export default LoginPage