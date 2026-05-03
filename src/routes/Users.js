import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { db } from '../config/firebase'
import User from '../components/User'
import AddUser from '../components/AddUser'
import Loading from '../components/Loading'

export const UsersReloadContext = React.createContext()

const Users = () => {
  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)

  const getUsers = async () => {
    try {
      const snapshot = await db.collection('users').get()
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,   // Firebase UID
        ...doc.data(),
      }))
      setUsers(userList)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [reload])

  return (
    <UsersReloadContext.Provider value={{ reload, setReload }}>
      <div className="container-manage">
        <div className="container-add-user">
          <div className="section-title">
            <img className="section-logo" src="/img/users.png" alt="" height="50px" width="50px" />
            <h2 color="#FFFFFF">Manage Users</h2>
          </div>
        </div>
        <div className="container-item-header">
          <div className="user-info-header">
            <p className="item-user-header">EMAIL</p>
            <p className="item-user-header">UID</p>
            <p className="item-user-header">PRIVILEGES</p>
          </div>
        </div>
        <AddUser users={users} />
        {loading && <Loading  offset={true}/>}
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </UsersReloadContext.Provider>
  )
}

export default withRouter(Users)