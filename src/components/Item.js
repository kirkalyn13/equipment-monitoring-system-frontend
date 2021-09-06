import React from 'react'
import { useState, useContext } from 'react'
import Edit from './Edit';
import axios from 'axios'
import { ReloadContext } from './Manage'
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"

export const EditContext = React.createContext()

const Item = ({item}) => {
    const [ showEdit, setShowEdit ] = useState(false)
    const {reload, setReload} = useContext(ReloadContext)

    const deleteEquipment = () => {
        const r = window.confirm(`Are you sure you want to delete ${item.name} (${item.serial})?`)
        if(r === true){
            axios.delete(`http://localhost:3005/delete/${item.id}`).then(()=>{
            alert(`${item.name} (${item.serial}) successfully deleted.`)
            setReload(!reload)
        })
        }else{
            alert("Cancelled Delete.")
        }
        
      }

    const toggleEdit = () => setShowEdit(!showEdit)

    return (
        <EditContext.Provider value={{setShowEdit}}>
            <div className="container-item">
                <div className="item-details">
                    <p className="item-info">{item.name}</p>
                    <p className="item-info">{item.serial}</p>
                    <p className="item-info">{item.type}</p>
                    <p className="item-info">{item.brand}</p>
                </div>
                <div className="buttons-manage">
                    <IconButton aria-label="edit" color="inherit">
                        <EditIcon onClick={toggleEdit} />
                    </IconButton>
                    <IconButton aria-label="delete" color="inherit">
                        <DeleteIcon onClick={deleteEquipment} />
                    </IconButton>
                </div>
            </div>
            {showEdit === true ? <Edit info={item}/> : false}
        </EditContext.Provider>
    )
}

export default Item
