import React, { useState, useContext } from 'react'
import { UsersReloadContext } from '../routes/Users'
import { db } from '../config/firebase'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { fireAlert } from '../util/alert'
import { confirmDialog } from '../util/confirm'
import axios from 'axios'
import { SERVER } from '../App'

const User = ({ user }) => {
  const { reload, setReload } = useContext(UsersReloadContext)
  const [values, setValues] = useState({ ...user })

  const deleteUser = async () => {
    const r = await confirmDialog('Delete User?', `Are you sure you want to delete ${values.email}?`)
    if (r === true) {
      try {
        await axios.delete(`${SERVER}/users/${values.id}`)
        await db.collection('users').doc(values.id).delete()
        fireAlert('User Deleted', `${values.email} successfully deleted.`)
        setReload(!reload)
      } catch (err) {
        console.error('Failed to delete user:', err)
        fireAlert('Error', 'Failed to delete user. Please try again.')
      }
    } else {
      fireAlert('Delete Cancelled', 'Deletion did not proceed.')
    }
  }

  const editUser = async () => {
    const r = await confirmDialog('Update User?', `Are you sure you want to update ${values.email}?`)
    if (r === true) {
      try {
        await axios.put(`${SERVER}/users/${values.id}`, { 
          email: values.email, 
          password: values.password 
        })
        await db.collection('users').doc(values.id).update({
          email: values.email,
          role: values.role,
        })
        fireAlert('User Updated', `Updated role for ${values.email} to ${values.role}.`)
        setReload(!reload)
      } catch (err) {
        console.error('Failed to update user:', err)
        fireAlert('Error', 'Failed to update user. Please try again.')
      }
    } else {
      fireAlert('Edit', 'No changes applied.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    editUser()
  }

  return (
    <form className="user-form" autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="container-credentials">
        <div className="user-info-input">
          <input
            className="user-credentials"
            type="text"
            name="email"
            value={values.email}
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="user-info-input">
          <input
            className="user-credentials"
            type="password"
            name="password"
            value={values.password}
            placeholder="Password"
            onChange={handleInputChange}
          />
        </div>
        <div className="user-info-input">
          <div className="container-radio-label">
            <div className="radio-label">
              <input type="radio" name="role" value="basic"
                checked={values.role === 'basic'}
                onChange={handleInputChange} />
              <label htmlFor="basic">Basic</label>
            </div>
            <div className="radio-label">
              <input type="radio" name="role" value="admin"
                checked={values.role === 'admin'}
                onChange={handleInputChange} />
              <label htmlFor="admin">Admin</label>
            </div>
            <div className="radio-label">
              <input type="radio" name="role" value="super"
                checked={values.role === 'super'}
                onChange={handleInputChange} />
              <label htmlFor="super">Super</label>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-manage">
        <IconButton type="submit" aria-label="edit" color="inherit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="inherit" onClick={deleteUser}>
          <DeleteIcon />
        </IconButton>
      </div>
    </form>
  )
}

export default User