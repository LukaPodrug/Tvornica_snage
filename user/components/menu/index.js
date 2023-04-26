import { Image } from 'react-native'
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

const Tab = createBottomTabNavigator()

function Menu({ wrapperStyle, tabItemWrapperStyle, tabBarLabelTextStyle, tabBarIconStyle }) {
    const [loggedInLoading] = useRecoilState(store.loggedInLoading)
    const [loggedIn] = useRecoilState(store.loggedIn)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,

                tabBarStyle: [wrapperStyle, loggedInLoading && {display: 'none'}],
                tabBarItemStyle: tabItemWrapperStyle,
                tabBarLabelStyle: tabBarLabelTextStyle,
                tabBarLabelPosition: 'below-icon',

                tabBarActiveTintColor: '#000000',
                tabBarActiveBackgroundColor: '#e04f5f',
                
                tabBarInactiveTintColor: '#000000',
                tabBarInactiveBackgroundColor: '#e6e6e6'
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
                                        style={tabBarIconStyle}
                                        source={profileIcon}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name='trainings'
                            component={TrainingsPage}
                            options={{
                                unmountOnBlur: true,
                                tabBarLabel: 'trainings',
                                tabBarIcon: () => (
                                    <Image 
                                        style={tabBarIconStyle}
                                        source={trainingsIcon} 
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name='blogs'
                            component={NewsPage}
                            options={{
                                unmountOnBlur: true,
                                tabBarLabel: 'news',
                                tabBarIcon: () => (
                                    <Image 
                                        style={tabBarIconStyle}
                                        source={newsIcon} 
                                    />
                                )
                            }}
                        />
                    </>
                    :
                    <>
                        <Tab.Screen
                            name='login'
                            component={LoginPage}
                            options={{
                                unmountOnBlur: true,
                                tabBarLabel: 'login',
                                tabBarIcon: () => (
                                    <Image 
                                        style={tabBarIconStyle}
                                        source={loginIcon}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name='registration'
                            component={RegistrationPage}
                            options={{
                                unmountOnBlur: true,
                                tabBarLabel: 'registration',
                                tabBarIcon: () => (
                                    <Image 
                                        style={tabBarIconStyle}
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

export default Menu