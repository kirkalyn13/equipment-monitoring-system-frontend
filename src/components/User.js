import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UsersReloadContext } from './Users'
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"

export const UsersContext = React.createContext()

const  User = ({user}) => {
    const {reload, setReload} = useContext(UsersReloadContext)
    const [ values, setValues ] = useState({...user})
    const [submitState, setSubmitState] = useState(false)

    const deleteUser = () => {
        const r = window.confirm(`Are you sure you want to delete ${values.username}?`)
        if(r === true){
            axios.delete(`http://localhost:3005/deleteuser/${values.id}`).then(()=>{
            alert(`${values.username} successfully deleted.`)
            setReload(!reload)
        })
        }else{
            alert("Cancelled Delete.")
        }
      }

    const editUser = () => {
        axios.put(`http://localhost:3005/edituser/${values.id}`,{
          username: values.username,
          password: values.password,
          role: values.role,
        }).then(()=>{
          setSubmitState(!submitState)
          alert(`Updated User: ${values.username}.`)
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
        editUser()
        setReload(!reload)
        }

    return (
        <UsersContext.Provider>
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
                            type="text"
                            onChange={handleInputChange}
                            name="password" value={values.password}
                            required placeholder="Password"/>
                    </div>
                    <div className="user-info-input">
                        <div className="container-radio-label">
                            <div className="radio-label">
                                <input type="radio" name="role" value="basic" color="red" 
                                checked={values.role === "basic"}
                                onChange={handleInputChange}/>
                                <label for="basic">Basic</label>
                            </div>
                            <div className="radio-label">
                                <input type="radio" name="role" value="admin" 
                                checked={values.role === "admin"}
                                onChange={handleInputChange}/>
                                <label for="admin">Admin</label>
                            </div>
                            <div className="radio-label">
                                <input type="radio" name="role" value="super"
                                checked={values.role === "super"} 
                                onChange={handleInputChange}/>
                                <label for="super">Super</label>
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
        </UsersContext.Provider>
    )
}

export default User
