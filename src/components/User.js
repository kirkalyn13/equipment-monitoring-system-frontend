import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UsersReloadContext } from '../routes/Users'
import { SERVER } from '../App'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { fireAlert } from '../util/alert'
import { confirmDialog } from '../util/confirm'

const  User = ({user}) => {
    const {reload, setReload} = useContext(UsersReloadContext)
    const [ values, setValues ] = useState({...user, password: ""})
    const [submitState, setSubmitState] = useState(false)

    const deleteUser = () => {
        const r = confirmDialog("Delete User?", `Are you sure you want to delete ${values.username}?`)
        if(r === true){
            axios.delete(`${SERVER}/deleteuser/${values.id}`).then(()=>{
            fireAlert("User Deleted", `${values.username} successfully deleted.`)
            setReload(!reload)
        })
        }else{
            fireAlert("Delete Cancelled", "Deletion did not proceed.")
        }
      }

    const editUser = () => {
        const r = confirmDialog("Update User?", `Are you sure you want to update ${values.username}?`)
        if(r === true){
            axios.put(`${SERVER}/edituser/${values.id}`,{
            username: values.username,
            password: values.password,
            role: values.role,
        }).then(()=>{
          setSubmitState(!submitState)
          fireAlert("User Updated", `Updated User: ${values.username}.`)
        })
        }else{
            setSubmitState(!submitState)
            fireAlert("Edit", "No changes applied.")
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
