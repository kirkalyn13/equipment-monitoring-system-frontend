// src/App.js
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { auth, db } from './config/firebase'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Equipment from './routes/Equipment'
import Dashboard from './routes/Dashboard'
import View from './routes/View'
import Add from './routes/Add'
import Manage from './routes/Manage'
import Login from './routes/Login'
import Users from './routes/Users'
import History from './routes/History'
import ProtectedRoute from './routes/ProtectedRoute'
import { URL } from './config/config'

const SCHOOL = "School of Engineering and Architecture"
export const DEPT = "SEA Laboratory"
export const SERVER = URL
export const LoginContext = React.createContext()
export const WRITE_ACCESS = ["admin", "super"]
export const SUPER_ACCESS = ["super"]

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await db.collection('users').doc(firebaseUser.uid).get()
          const role = userDoc.exists ? userDoc.data().role : 'basic'

          setUser({
            uid: firebaseUser.uid,
            username: firebaseUser.email,
            role,
            login: true,
          })
          setIsAuth(true)
        } catch (err) {
          console.error('Failed to fetch user role:', err)
          setIsAuth(false)
          setUser({})
        }
      } else {
        setIsAuth(false)
        setUser({})
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return null

  return (
    <LoginContext.Provider value={{ user, setUser, setIsAuth, isAuth }}>
      <Router>
        <div className="App">
          {isAuth && user.login ? (
            <>
              <Header school={SCHOOL} />
              <div className="container-body">
                <Sidebar role={user.role} />
                <Switch>
                  <Route exact path="/">
                    <Dashboard dept={DEPT} />
                  </Route>
                  <Route path="/view">
                    <View />
                  </Route>
                  <Route path="/equipment/:id">
                    <Equipment />
                  </Route>
                  <Route path="/changelog/:id">
                    <History />
                  </Route>
                  <ProtectedRoute path="/add"
                    allowedRoles={WRITE_ACCESS} userRole={user.role}
                    component={Add} isAuth={isAuth} />
                  <ProtectedRoute path="/manage"
                    allowedRoles={WRITE_ACCESS} userRole={user.role}
                    component={Manage} isAuth={isAuth} />
                  <ProtectedRoute path="/users"
                    allowedRoles={SUPER_ACCESS} userRole={user.role}
                    component={Users} isAuth={isAuth} />
                </Switch>
              </div>
              <Footer />
            </>
          ) : (
            <Login school={SCHOOL} />
          )}
        </div>
      </Router>
    </LoginContext.Provider>
  )
}

export default App