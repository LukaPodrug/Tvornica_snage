import { StyleSheet, View, StatusBar, Platform } from 'react-native'

import Header from './components/header'

function App() {
  return (
    <View 
      style={styles.wrapper}
    >
      <Header/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems:'center',

    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,

    backgroundColor: '#000000'
  }
})

export default App