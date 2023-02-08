import { useEffect, useState } from 'react'
import { StyleSheet, View, StatusBar, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

import { cache, client } from './API/contentful/client'
import LoadingPage from './pages/loading'
import Header from './components/header'
import Menu from './components/menu'

function App() {
  const [loadingCache, setLoadingCache] = useState(true)

  const [fontsLoaded, error] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold
  })

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if(!fontsLoaded || loadingCache) {
    return (
      <LoadingPage 
        style={null}
      />
    )
  }

  return (
    <ApolloProvider
      client={client}
    >
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
    </ApolloProvider>
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