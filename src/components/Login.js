import { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../App'

const Login = () => {
    const { setUser } = useContext(LoginContext)
    const initialFieldValues = {
        username: '',
        password: '',
    }
    const [ values, setValues ] = useState(initialFieldValues)
    const [submitState, setSubmitState] = useState(false)

    const handleFormSubmit = e => {
        e.preventDefault()
        setSubmitState(!submitState)
        setUser(values)
        }

    useEffect(()=>{
        setValues(initialFieldValues)
    },[submitState])

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    return (
        <div className="login-page">
            <img className="logo" src="logo.png" width="200" height="200" alt="logo" margin="20px"/>
            <h1 className="login-title">Equipment Monitoring System </h1>
            <div className="login">
                <form className="input-info" autoComplete="off" onSubmit={handleFormSubmit}>
                    <label className="label-info">User Name: </label>
                    <input className="input-login" type="text" 
                    onChange={handleInputChange}
                    name="username" value={values.username}
                    required placeholder="Enter User Name"/>
                    <label className="label-info">Password: </label>
                    <input  className="input-login" type="password" 
                    onChange={handleInputChange}
                    name="password" value={values.password}
                    required placeholder="Enter Password"/>
                    <input className="btn-login" type="submit" value="LOG IN"/>
                </form>
            </div>
        </div>
    )
}

export default Login
