import { useState, useContext } from 'react'
import { auth } from '../config/firebase'
import { LoginContext } from '../App'
import Alert from '@mui/material/Alert'

const Login = ({ school }) => {
  const [invalid, setInvalid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Invalid user credentials.')
  const { setIsAuth } = useContext(LoginContext)

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setInvalid(false)

    try {
      await auth.signInWithEmailAndPassword(values.username, values.password)
      // onAuthStateChanged in App.js takes over from here
    } catch (err) {
      console.error(err)
      setIsAuth(false)

      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential'
      ) {
        setErrorMessage('Invalid user credentials.')
      } else if (err.code === 'auth/too-many-requests') {
        setErrorMessage('Too many attempts. Please try again later.')
      } else {
        setErrorMessage('Something went wrong. Please try again.')
      }

      setInvalid(true)
    }

    setValues((prev) => ({ ...prev, password: '' }))
  }

  return (
    <div className="login-page">
      <img className="logo" src="logo.png" width="300" height="300" alt="logo" />
      <div className="title">
        <h1 className="title-text-head">{school}</h1>
        <h2 className="title-text">Equipment Monitoring System</h2>
      </div>
      <div className="login">
        <form className="input-info-login" autoComplete="off" onSubmit={handleFormSubmit}>
          {invalid && (
            <Alert
              severity="error"
              variant="outlined"
              style={{ color: '#F44336', fontWeight: 'bold', fontSize: 'medium' }}
            >
              {errorMessage}
            </Alert>
          )}
          <label className="label-info">User Name:</label>
          <input
            className="input-login"
            type="text"
            onChange={handleInputChange}
            name="username"
            value={values.username}
            required
            placeholder="Enter Email Address"
          />
          <label className="label-info">Password:</label>
          <input
            className="input-login"
            type="password"
            onChange={handleInputChange}
            name="password"
            value={values.password}
            required
            placeholder="Enter Password"
          />
          <input className="btn-login" type="submit" value="LOG IN" />
        </form>
      </div>
    </div>
  )
}

export default Login