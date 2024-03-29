import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

import LoadingPage from './pages/loading'
import Header from './components/header'
import Menu from './components/menu'
import { cache, client } from './API/graphQL/client'

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
        <StatusBar
          style='dark'
        />
        <View 
          style={styles.wrapper}
        >
          <Header
            wrapperStyle={styles.headerWrapper}
            headerImageWrapperStyle={styles.headerImageWrapper}
            headerImageStyle={styles.headerImage}
          />
          <NavigationContainer>
            <Menu
              wrapperStyle={styles.tabBarWrapper}
              tabItemWrapperStyle={styles.tabBarItemWrapper}
              tabBarLabelTextStyle={styles.tabBarItemLabelText}
              tabBarIconStyle={styles.tabBarItemIcon}
            />
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
  },

  headerWrapper: {
    width: '100%',
    height: 100,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',

    marginTop: Constants.statusBarHeight + 1,

    backgroundColor: '#e6e6e6',

    borderRadius: 10,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000000',

    elevation: 8
  },
  headerImage: {
    resizeMode: "stretch",
    width: '100%',
    height: 100
  },

  tabBarWrapper: {
    height: 80,

    borderRadius: 10,
    
    position: 'absolute',
    bottom: 0,

    backgroundColor: '#e6e6e6'
  },
  tabBarItemWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 15,
    paddingBottom: 15,

    height: 80,

    borderRadius: 10
  },
  tabBarItemLabelText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 13,
    textTransform: 'uppercase'
  },
  tabBarItemIcon: {
    width: 20,
    height: 20
  }
})

export default App