import { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../App'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'

const Login = () => {
    const [ invalid, setInvalid ] = useState(false)
    const { user, setUser, setIsAuth} = useContext(LoginContext)
    const initialFieldValues = {
        username: '',
        password: '',
    }
    
    const [ values, setValues ] = useState(initialFieldValues)
    const [submitState, setSubmitState] = useState(false)
    
    const submitCredentials = () => {
        axios.post('http://localhost:3005/login',{
          username: values.username,
          password: values.password,
        }).then(response =>{
            if(response.data.login === true){
                setUser(response.data)
                login()
            }else{
                setUser({
                    username: "",
                    role:"basic",
                    login: false
                })
                invalidUser()
            }
        }).catch(err =>{
            console.log(err);
        })
      }

    const login = () =>{
        setIsAuth(true)
        setInvalid(false)
    }

    const invalidUser = () => {
        setIsAuth(false)
        setInvalid(true)
        localStorage.removeItem("ems-user")
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        submitCredentials()
        setSubmitState(!submitState)
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
                {invalid === true ? 
                <Alert 
                    severity="error" width="200px" variant="outlined"
                    style={{color:'#F44336',fontWeight:'bold', fontSize:'medium'}}>
                        Invalid User Credentials.
                </Alert> : null}
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
