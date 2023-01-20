import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import store from './store'
import Layout from './components/layout'
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
              path={ loggedIn ? '/profile' : '/registration' }
              element={ <div>REGISTRATION</div> }
            />
            <Route
              path={ loggedIn ? '/profile' : '/login' }
              element={ <div>LOGIN</div> }
            />
            <Route
              path={ loggedIn ? '/profile' : '/login' }
              element={ <div>PROFILE</div> }
            />
            <Route
              path={ loggedIn ? '/trainings' : '/login' }
              element={ <div>TRAININGS</div> }
            />
            <Route
              path={ loggedIn ? '/users' : '/login' }
              element={ <div>USERS</div> }
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
