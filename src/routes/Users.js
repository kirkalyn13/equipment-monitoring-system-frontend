import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { SERVER } from '../App'
import User from '../components/User'
import AddUser from '../components/AddUser'
import axios from 'axios'
import Loading from '../components/Loading'

export const UsersReloadContext = React.createContext()

const Users = () => {
    const [ users, setUsers ] = useState([])
    const [ reload, setReload ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    const getUsers = () => {
        axios.get(`${SERVER}/allusers`).then((response)=>{
            setUsers(response.data)
        })
    } 

    useEffect(()=>{
        setTimeout(()=>{
            getUsers()
            setLoading(false)
          },500)
    },[reload])

    return (
        <UsersReloadContext.Provider value={{reload, setReload}}>
            <div className="container-manage">
                <div className="container-add-user">
                    <div className="section-title">
                        <img className="section-logo" src="/img/users.png" alt="" height="50px" width="50px" />
                        <h2 color="#FFFFFF">Manage Users</h2>
                    </div>
                </div>
            <div className="container-item-header">
                <div className="user-info-header">
                    <p className="item-user-header">USERNAME</p>
                    <p className="item-user-header">PASSWORD</p>
                    <p className="item-user-header">PRIVILEGES</p>
                </div>
            </div>
            <AddUser users={users}/>
            {loading === true ? <Loading /> : null}
            {users.map((user) =>{
                    return  <User key={user.id} user={user} />
                })}
            
            </div>
        </UsersReloadContext.Provider>
    )
}

export default withRouter(Users)
