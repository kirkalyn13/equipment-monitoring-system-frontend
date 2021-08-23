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

export const LoginContext = React.createContext()

function App() {
  const [ user, setUser ] = useState({
    username: "",
    password: ""
  })
  
  useEffect(() => {
    const data = localStorage.getItem("ems-user")
    if(data){
      setUser(JSON.parse(data))
    }
  },[])

  useEffect(() => {
    localStorage.setItem("ems-user", JSON.stringify(user))
  })

  return (
    <LoginContext.Provider value={{user, setUser}}>
      <Router>
      <div className="App">
        {(user.username !== "") ? (
          <>
          <Header />
          <div className="container-body">
            <Sidebar />
          <Switch>
            <Route exact path="/">
              <Dashboard />
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
