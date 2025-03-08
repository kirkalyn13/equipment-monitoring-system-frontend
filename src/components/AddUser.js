import React, { useState, useEffect,useContext } from 'react'
import { UsersReloadContext } from '../routes/Users'
import { SERVER } from '../App'
import axios from 'axios'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { fireAlert } from '../util/alert'

const AddUser = ({users}) => {
    const {reload, setReload} = useContext(UsersReloadContext)
    const existingUsers = users.map(user => user.username)
    const initialFieldValues = {
        username: '',
        password: '',
        role: 'basic',
    }

    const [ values, setValues ] = useState(initialFieldValues)
    const [submitState, setSubmitState] = useState(false)

    const addUser = () => {
        axios.post( `${SERVER}/createuser`,{
          username: values.username,
          password: values.password,
          role: values.role
        }).then(()=>{
          fireAlert("New User Added", `Added New User: ${values.username}, with ${values.role} privileges.`)
          setSubmitState(!submitState)
        })
      }

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if(existingUsers.includes(values.username)){
            fireAlert("Username Taken", `Username ${values.username} is already taken.`)
            setSubmitState(!submitState)
        setReload(!reload)
        }else{
            addUser()
            setSubmitState(!submitState)
            setReload(!reload)
        }
        }

    useEffect(()=>{
        setValues(initialFieldValues)
    },[submitState])

    return (
        <form className="user-form" autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="container-credentials">
                    <div className="user-info-input">
                        <input 
                            className="user-credentials"
                            type="text"
                            onChange={handleInputChange}
                            name="username" value={values.username}
                            required placeholder="Username"/>
                    </div>
                    <div className="user-info-input">
                        <input 
                            className="user-credentials"
                            type="password"
                            onChange={handleInputChange}
                            name="password" value={values.password}
                            required placeholder="Password"/>
                    </div>
                    <div className="user-info-input">
                        <div className="container-radio-label">
                            <div className="radio-label">
                                <input type="radio" id="basic" name="role" value="basic" color="red" 
                                checked={values.role === "basic"}
                                onChange={handleInputChange}/>
                                <label htmlFor="basic">Basic</label>
                            </div>
                            <div className="radio-label">
                                <input type="radio"  id="admin" name="role" value="admin" 
                                checked={values.role === "admin"}
                                onChange={handleInputChange}/>
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div className="radio-label">
                                <input type="radio" id="super" name="role" value="super"
                                checked={values.role === "super"} 
                                onChange={handleInputChange}/>
                                <label htmlFor="super">Super</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons-manage">
                    <Button
                    type="submit" 
                    variant="contained"
                    style={{margin:"2px 0px",backgroundColor: '#FFAA00', color: '#000', fontWeight:"bold", border:"none"}}
                    startIcon={<AddCircleIcon />}
                    >
                        NEW
                    </Button>
                </div>
            </form>
    )
}

export default AddUser
