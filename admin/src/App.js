import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import store from './store'
import Layout from './components/layout'
import LoginPage from './pages/login'
import ProfilePage from './pages/profile'
import TrainingsPage from './pages/trainings'
import { verifyTokenAPI } from './API/auth'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useRecoilState(store.loggedIn)
  const [, setToken] = useRecoilState(store.token)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verifyToken() {
      if(localStorage.getItem('token')) {
        try {
          const verifyTokenResponse = await verifyTokenAPI(localStorage.getItem('token'))
          setLoggedIn(true)
          setToken(verifyTokenResponse.headers.authorization)
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
        catch(error) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      }
      else {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    verifyToken()
  }, [])

  return (
    <div 
      className="App"
    >
      <BrowserRouter>
        <Routes>
          <Route
            exact path='/'
            element={ <Layout loading={loading}/> }
          >
            <Route
              path='/registration'
              element={ !loggedIn ? <div>REGISTRATION</div> : <Navigate to='/profile'/> }
            />
            <Route
              path='/login'
              element={ !loggedIn ? <LoginPage/> : <Navigate to='/profile'/> }
            />
            <Route
              path='/profile'
              element={ loggedIn ? <ProfilePage/> : <Navigate to='/login'/> }
            />
            <Route
              path='/trainings'
              element={ loggedIn ? <TrainingsPage/> : <Navigate to='/login'/> }
            />
            <Route
              path='/users'
              element={ loggedIn ? <div>USERS</div> : <Navigate to='/login'/> }
            />
            <Route
              path='/'
              element={ <Navigate
                to={ loggedIn ? '/profile' : '/login' }
              /> }
            />
            <Route
              path='*'
              element={ <Navigate
                to={ loggedIn ? '/profile' : '/login' }
              /> }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
