import React, { useState, useContext } from 'react'
import Edit from './Edit'
import axios from 'axios'
import { ReloadContext } from '../routes/Manage'
import { SERVER } from '../App'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { fireAlert } from '../util/alert'
import { confirmDialog } from '../util/confirm'

export const EditContext = React.createContext()

const Item = ({item}) => {
    const [ showEdit, setShowEdit ] = useState(false)
    const {reload, setReload, showItems, setShowItems } = useContext(ReloadContext)

    const deleteEquipment = async () => {
        const r = await confirmDialog("Delete Equipment?", `Are you sure you want to permanently delete ${item.name} (${item.serial}) from the records?`)
        if(r === true){
            axios.delete(`${SERVER}/delete/${item.id}`).then(()=>{
            fireAlert("Equipment Deleted", `${item.name} (${item.serial}) successfully deleted.`)
            setReload(!reload)
        })
        }else{
            fireAlert("Delete Cancelled", "Deletion did not proceed.")
        }
        
      }

    const toggleEdit = () => {
        setShowItems(!showItems)
        setShowEdit(!showEdit)
    }

    return (
        <EditContext.Provider value={{setShowEdit, toggleEdit}}>
            {showItems ?
            <div className="container-item">
                <div className="item-details">
                    <p className="item-info">{item.name}</p>
                    <p className="item-info">{item.serial}</p>
                    <p className="item-info">{item.type}</p>
                    <p className="item-info">{item.status}</p>
                </div>
                <div className="buttons-manage">
                    <IconButton aria-label="edit" color="inherit" onClick={toggleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="inherit" onClick={() => deleteEquipment()} >
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
            :
            null}
            {showEdit === true ? <Edit info={item}/> : null}
        </EditContext.Provider>
    )
}

export default Item
