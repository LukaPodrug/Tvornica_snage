import { StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useRecoilState } from 'recoil'

import store from '../../store'
import RegistrationPage from '../../pages/registration'
import LoginPage from '../../pages/login'
import ProfilePage from '../../pages/profile'
import TrainingsPage from '../../pages/trainings'
import NewsPage from '../../pages/news'

import registrationIcon from '../../assets/icons/registration.png'
import loginIcon from '../../assets/icons/login.png'
import profileIcon from '../../assets/icons/profile.png'
import trainingsIcon from '../../assets/icons/trainings.png'
import newsIcon from '../../assets/icons/news.png'
import logoutIcon from '../../assets/icons/logout.png'

const Tab = createBottomTabNavigator()

function Menu() {
    const [loggedIn, setLoggedIn] = useRecoilState(store.loggedIn)
    const [, setToken] = useRecoilState(store.token)
    const [, setOwnData] = useRecoilState(store.ownData)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,

                tabBarStyle: styles.wrapper,
                tabBarItemStyle: styles.tab,
                tabBarLabelStyle: styles.label,

                tabBarActiveTintColor: '#000000',
                tabBarActiveBackgroundColor: '#90ee90',
                
                tabBarInactiveTintColor: '#000000',
                tabBarInctiveBackgroundColor: '#ffffff'
            }}
        >
            {
                loggedIn ?
                    <>
                        <Tab.Screen
                            name='profile'
                            component={ProfilePage}
                            options={{
                                tabBarLabel: 'profile',
                                tabBarIcon: () => (
                                    <Image 
                                        style={styles.icon}
                                        source={profileIcon}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name='trainings'
                            component={TrainingsPage}
                            options={{
                                tabBarLabel: 'trainings',
                                tabBarIcon: () => (
                                    <Image 
                                        style={styles.icon}
                                        source={trainingsIcon} 
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name='blogs'
                            component={NewsPage}
                            options={{
                                tabBarLabel: 'news',
                                tabBarIcon: () => (
                                    <Image 
                                        style={styles.icon}
                                        source={newsIcon} 
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name='logout'
                            component={LoginPage}
                            options={{
                                tabBarLabel: 'logout',
                                tabBarIcon: () => (
                                    <Image 
                                        style={styles.icon}
                                        source={logoutIcon} 
                                    />
                                )
                            }}
                            listeners={() => ({
                                tabPress: () => {
                                    setToken(null)
                                    setLoggedIn(false)
                                    setOwnData(null)
                                }
                            })}
                        />
                    </>
                    :
                    <>
                        <Tab.Screen
                            name='login'
                            component={LoginPage}
                            options={{
                                tabBarLabel: 'login',
                                tabBarIcon: () => (
                                    <Image 
                                        style={styles.icon}
                                        source={loginIcon}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name='registration'
                            component={RegistrationPage}
                            options={{
                                tabBarLabel: 'registration',
                                tabBarIcon: () => (
                                    <Image 
                                        style={styles.icon}
                                        source={registrationIcon}
                                    />
                                )
                            }}
                        />
                    </>
            }
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 80,

        borderRadius: 10,
        
        position: 'absolute',
        bottom: 0
    },
    tab: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        paddingTop: 15,
        paddingBottom: 15,

        borderRadius: 10
    },
    label: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 13,
        textTransform: 'uppercase'
    },
    icon: {
        width: 20,
        height: 20
    }
})

export default Menu