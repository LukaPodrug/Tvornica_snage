import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

import LoadingPage from './pages/loading'
import Header from './components/header'
import Menu from './components/menu'
import { cache, client } from './API/graphQL/client'

function App() {
  const [loadingCache, setLoadingCache] = useState(true)

  const [fontsLoaded, error] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
    Norwester: require('./assets/fonts/norwester.otf')
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
          style={styles.wrapper}
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
  wrapper: {
    width: '100%',
    minHeight: '100%',

    backgroundColor: '#000000'
  }
})

export default App