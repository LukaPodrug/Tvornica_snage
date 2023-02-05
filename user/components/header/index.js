import { StyleSheet, View, Image } from 'react-native'

import logo from '../../assets/images/logo.png'

function Header() {
  return (
    <View 
      style={styles.wrapper}
    >
        <Image
            style={styles.logo}
            source={logo}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,

    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',

    backgroundColor: '#ffffff',

    borderRadius: 10,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e6e6e6',

    elevation: 8
  },
  logo: {
    width: 50,
    height: 70
  }
})

export default Header