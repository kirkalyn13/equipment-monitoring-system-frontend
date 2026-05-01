import React, { useState, useEffect, useContext } from 'react'
import { UsersReloadContext } from '../routes/Users'
import { secondaryAuth, db } from '../config/firebase'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { fireAlert } from '../util/alert'

const AddUser = ({ users }) => {
  const { reload, setReload } = useContext(UsersReloadContext)
  const existingEmails = users.map((user) => user.email)

  const initialFieldValues = {
    email: '',
    password: '',
    role: 'basic',
  }

  const [values, setValues] = useState(initialFieldValues)
  const [submitState, setSubmitState] = useState(false)

  const addUser = async () => {
    try {
      // Create the user in Firebase Auth
      const credential = await secondaryAuth.createUserWithEmailAndPassword(
        values.email,
        values.password
      )
      // Store their role in Firestore using the generated UID
      await db.collection('users').doc(credential.user.uid).set({
        email: values.email,
        role: values.role,
      })
      fireAlert('New User Added', `Added ${values.email} with ${values.role} privileges.`)
      setSubmitState(!submitState)
      setReload(!reload)
    } catch (err) {
      console.error('Failed to create user:', err)
      if (err.code === 'auth/email-already-in-use') {
        fireAlert('Email Taken', `${values.email} is already registered.`)
      } else if (err.code === 'auth/weak-password') {
        fireAlert('Weak Password', 'Password must be at least 6 characters.')
      } else {
        fireAlert('Error', 'Failed to create user. Please try again.')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (existingEmails.includes(values.email)) {
      fireAlert('Email Taken', `${values.email} is already registered.`)
      setSubmitState(!submitState)
      setReload(!reload)
    } else {
      addUser()
    }
  }

  useEffect(() => {
    setValues(initialFieldValues)
  }, [submitState])

  return (
    <form className="user-form" autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="container-credentials">
        <div className="user-info-input">
          <input
            className="user-credentials"
            type="email"
            onChange={handleInputChange}
            name="email"
            value={values.email}
            required
            placeholder="Email Address"
          />
        </div>
        <div className="user-info-input">
          <input
            className="user-credentials"
            type="password"
            onChange={handleInputChange}
            name="password"
            value={values.password}
            required
            placeholder="Password"
          />
        </div>
        <div className="user-info-input">
          <div className="container-radio-label">
            <div className="radio-label">
              <input type="radio" id="basic" name="role" value="basic"
                checked={values.role === 'basic'}
                onChange={handleInputChange} />
              <label htmlFor="basic">Basic</label>
            </div>
            <div className="radio-label">
              <input type="radio" id="admin" name="role" value="admin"
                checked={values.role === 'admin'}
                onChange={handleInputChange} />
              <label htmlFor="admin">Admin</label>
            </div>
            <div className="radio-label">
              <input type="radio" id="super" name="role" value="super"
                checked={values.role === 'super'}
                onChange={handleInputChange} />
              <label htmlFor="super">Super</label>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-manage">
        <Button
          type="submit"
          variant="contained"
          style={{ margin: '2px 0px', backgroundColor: '#FFAA00', color: '#000', fontWeight: 'bold', border: 'none' }}
          startIcon={<AddCircleIcon />}
        >
          NEW
        </Button>
      </div>
    </form>
  )
}

export default AddUser