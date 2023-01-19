import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/layout'
import './App.css'

function App() {
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
              element={ <div>REGISTRATION</div> }
            />
            <Route
              path='/login'
              element={ <div>LOGIN</div> }
            />
            <Route
              path='/'
              element={ <Navigate
                to='/login'
              /> }
            />
            <Route
              path='*'
              element={ <Navigate
                to='/login'
              /> }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
