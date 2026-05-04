import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
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
import NotFound from './routes/NotFound'
import Unauthorized from './routes/Unauthorized'
import { URL } from './config/config'

const SCHOOL = "School of Engineering and Architecture"
export const DEPT = "SEA Laboratory"
export const SERVER = URL
export const WRITE_ACCESS = ["admin", "super"]
export const SUPER_ACCESS = ["super"]
export const LoginContext = React.createContext()


// Redirects to /login if not authenticated
function RequireAuth({ isAuth, children }) {
  if (!isAuth) return <Redirect to="/login" />
  return children
}

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
          setUser({ uid: firebaseUser.uid, username: firebaseUser.email, role, login: true })
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
        <Switch>

          {/* Public route — redirect away if already logged in */}
          <Route path="/login">
            {isAuth ? <Redirect to="/" /> : <Login school={SCHOOL} />}
          </Route>

          {/* All authenticated routes */}
          <Route>
            <RequireAuth isAuth={isAuth}>
              <div className="App">
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
                    <Route path="/unauthorized">
                      <Unauthorized />
                    </Route>
                    <Route>
                      <NotFound />
                    </Route>
                  </Switch>
                </div>
                <Footer />
              </div>
            </RequireAuth>
          </Route>

        </Switch>
      </Router>
    </LoginContext.Provider>
  )
}

export default App