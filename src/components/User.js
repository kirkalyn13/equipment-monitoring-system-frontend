import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UsersReloadContext } from '../routes/Users'
import { SERVER } from '../App'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const  User = ({user}) => {
    const {reload, setReload} = useContext(UsersReloadContext)
    const [ values, setValues ] = useState({...user, password: ""})
    const [submitState, setSubmitState] = useState(false)

    const deleteUser = () => {
        const r = window.confirm(`Are you sure you want to delete ${values.username}?`)
        if(r === true){
            axios.delete(`http://${SERVER}/deleteuser/${values.id}`).then(()=>{
            alert(`${values.username} successfully deleted.`)
            setReload(!reload)
        })
        }else{
            alert("Cancelled Delete.")
        }
      }

    const editUser = () => {
        console.log(values.id)
        const r = window.confirm(`Are you sure you want to edit ${values.username}?`)
        if(r === true){
            axios.put(`http://${SERVER}/edituser/${values.id}`,{
            username: values.username,
            password: values.password,
            role: values.role,
        }).then(()=>{
          setSubmitState(!submitState)
          alert(`Updated User: ${values.username}.`)
        })
        }else{
            setSubmitState(!submitState)
            alert("No changes applied.")
        }
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
        editUser()
        setReload(!reload)
        }

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
                            required placeholder="Re-enter Password"/>
                    </div>
                    <div className="user-info-input">
                        <div className="container-radio-label">
                            <div className="radio-label">
                                <input type="radio" name="role" value="basic" color="red" 
                                checked={values.role === "basic"}
                                onChange={handleInputChange}/>
                                <label htmlFor="basic">Basic</label>
                            </div>
                            <div className="radio-label">
                                <input type="radio" name="role" value="admin" 
                                checked={values.role === "admin"}
                                onChange={handleInputChange}/>
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div className="radio-label">
                                <input type="radio" name="role" value="super"
                                checked={values.role === "super"} 
                                onChange={handleInputChange}/>
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
