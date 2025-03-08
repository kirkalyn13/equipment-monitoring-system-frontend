import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Equipment  from './routes/Equipment'
import Dashboard  from './routes/Dashboard'
import View from './routes/View'
import Add from './routes/Add'
import Manage from './routes/Manage'
import Login from './routes/Login'
import Users from './routes/Users'
import ProtectedRoute from './routes/ProtectedRoute'
import { URL } from './config/config';

const SCHOOL = "School of Engineering and Architecture"
export const DEPT = "SEA Laboratory"
export const SERVER = URL
export const LoginContext = React.createContext()

function App() {
  const [ isAuth, setIsAuth ] = useState(false)
  const [ user, setUser ] = useState({})
  
  useEffect(() => {
    const data = localStorage.getItem("ems-user")
    if(data){
      setUser(JSON.parse(data))  
      setIsAuth(true) 
    }
  },[])

  useEffect(() => {
    localStorage.setItem("ems-user", JSON.stringify(user))
  })

  return (
    <LoginContext.Provider value={{user, setUser, setIsAuth, isAuth}}>
      <Router>
      <div className="App">
        {(isAuth === true && user.username !== "" && user.login === true) ? (
          <>
          <Header school={SCHOOL} />
          <div className="container-body">
            <Sidebar role={user.role}/>
          <Switch>
            <Route exact path="/">
              <Dashboard dept={DEPT}/>
            </Route>
            <Route path="/view">
              <View />
            </Route>
            <Route path="/equipment/:id">
              <Equipment />
            </Route>
            <ProtectedRoute path="/add" 
            allowedRoles={["admin","super"]} userRole={user.role}
            component={Add} isAuth={isAuth}/>
            <ProtectedRoute path="/manage" 
            allowedRoles={["admin","super"]} userRole={user.role}
            component={Manage} isAuth={isAuth}/>
            <ProtectedRoute path="/users" 
            allowedRoles={["super"]} userRole={user.role}
            component={Users} isAuth={isAuth}/>
          </Switch>
          </div>
          <Footer />
          </>
        ) : 
        <Login school={SCHOOL}/>
        }
        
      </div>
    </Router>
    </LoginContext.Provider>
  );
}

export default App;
