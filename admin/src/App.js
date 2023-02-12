import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import store from './store'
import Layout from './components/layout'
import RegistrationPage from './pages/registration'
import LoginPage from './pages/login'
import ProfilePage from './pages/profile'
import TrainingsPage from './pages/trainings'
import UsersPage from './pages/users'
import { verifyTokenAPI } from './API/auth'
import { getOwnDataAPI, getAllCoachesDataAPI } from './API/coach'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useRecoilState(store.loggedIn)
  const [token, setToken] = useRecoilState(store.token)
  const [, setOwnData] = useRecoilState(store.ownData)
  const [, setAllCoachesData] = useRecoilState(store.allCoachesData)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verifyToken() {
      if(localStorage.getItem('token')) {
        try {
          const verifyTokenResponse = await verifyTokenAPI(localStorage.getItem('token'))
          setToken(verifyTokenResponse.headers.authorization)
        }
        catch(error) {
          return
        }
      }
      else {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  useEffect(() => {
    async function getOwnData() {
      try {
          const getOwnDataResponse = await getOwnDataAPI(token)
          setOwnData(getOwnDataResponse.data[0])
      }
      catch(error) {
          return
      }
    }

    async function getAllCoachesData() {
      try {
          const getAllCoachesDataResponse = await getAllCoachesDataAPI(token)
          setAllCoachesData(getAllCoachesDataResponse.data)
      }
      catch(error) {
          return
      }
    }

    async function fetchStoreData() {
      setLoading(true)
      await getOwnData()
      await getAllCoachesData()
      setLoggedIn(true)
      setLoading(false)
    }

    if(token) {
      fetchStoreData()
    }
  }, [token])

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
              element={ !loggedIn ? <RegistrationPage/> : <Navigate to='/profile'/> }
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
              element={ loggedIn ? <UsersPage/> : <Navigate to='/login'/> }
            />
            <Route
              path='/'
              element={ <Navigate to={ loggedIn ? '/profile' : '/login' }/> }
            />
            <Route
              path='*'
              element={ <Navigate to={ loggedIn ? '/profile' : '/login' }/> }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
