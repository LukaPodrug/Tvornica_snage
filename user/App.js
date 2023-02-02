import { StyleSheet, View, StatusBar, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

import LoadingPage from './pages/loading'
import Header from './components/header'
import Menu from './components/menu'

function App() {
  const [fontsLoaded, error] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold
  })

  if(!fontsLoaded) {
    return (
      <LoadingPage style={null}/>
    )
  }

  return (
    <RecoilRoot>
      <View 
        style={styles.appWrapper}
      >
        <Header/>
        <NavigationContainer>
          <Menu/>
        </NavigationContainer>
      </View>
    </RecoilRoot>
  )
}

const styles = StyleSheet.create({
  appWrapper: {
    width: '100%',
    minHeight: '100%',

    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,

    backgroundColor: '#000000'
  }
})

export default App