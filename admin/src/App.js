import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import store from './store'
import Layout from './components/layout'
import LoginPage from './pages/login'
import './App.css'

function App() {
  const [loggedIn] = useRecoilState(store.loggedIn)

  return (
    <div 
      className="App"
    >
      <BrowserRouter>
        <Routes>
          <Route
            exact path='/'
            element={ <Layout/> }
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
              element={ loggedIn ? <div>PROFILE</div> : <Navigate to='/login'/> }
            />
            <Route
              path='/trainings'
              element={ loggedIn ? <div>TRAININGS</div> : <Navigate to='/login'/> }
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
