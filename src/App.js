import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react'
import { useState, useEffect } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Dashboard  from './components/Dashboard'
import View from './components/View'
import Add from './components/Add'
import Manage from './components/Manage'
import Login from './components/Login';
import Users from './components/Users';


export const LoginContext = React.createContext()
const DEPT = "Physics Lab"

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

  useEffect(()=>{
    console.log(isAuth)
  },[isAuth])

  useEffect(() => {
    localStorage.setItem("ems-user", JSON.stringify(user))
  })

  return (
    <LoginContext.Provider value={{user, setUser, setIsAuth, isAuth}}>
      <Router>
      <div className="App">
        {(isAuth === true && user.username !== "" && user.login === true) ? (
          <>
          <Header />
          <div className="container-body">
            <Sidebar />
          <Switch>
            <Route exact path="/">
              <Dashboard dept={DEPT}/>
            </Route>
            <Route path="/view">
              <View />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
            <Route path="/manage">
              <Manage />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
          </div>
          <Footer />
          </>
        ) : 
        <Login />
        }
        
      </div>
    </Router>
    </LoginContext.Provider>
  );
}

export default App;
