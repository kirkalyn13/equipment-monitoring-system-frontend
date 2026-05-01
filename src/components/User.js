import React, { useState, useContext } from 'react'
import { UsersReloadContext } from '../routes/Users'
import { db } from '../config/firebase'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { fireAlert } from '../util/alert'
import { confirmDialog } from '../util/confirm'

const User = ({ user }) => {
  const { reload, setReload } = useContext(UsersReloadContext)
  const [values, setValues] = useState({ ...user })

  const deleteUser = async () => {
    const r = await confirmDialog('Delete User?', `Are you sure you want to delete ${values.email}?`)
    if (r === true) {
      try {
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
        await db.collection('users').doc(values.id).update({
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
    setValues({ ...values, [name]: value })
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
            value={values.email}
            readOnly
            placeholder="Email"
            style={{ opacity: 0.6, cursor: 'not-allowed' }}
          />
        </div>
        <div className="user-info-input">
          <input
            className="user-credentials"
            type="password"
            value={values.id}
            readOnly
            placeholder="UID"
            style={{ opacity: 0.6, cursor: 'not-allowed', fontSize: '11px' }}
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