import React, { useState } from 'react'
import History from './History';
import IconButton from "@material-ui/core/IconButton"
import HistoryIcon from '@material-ui/icons/History'

const ItemHistory = ({item}) => {
    const [showHistory, setShowHistory] = useState()
    const toggleHistory = () => setShowHistory(!showHistory)
    
    return (
        <>
        <div className="container-item">
                <div className="item-details">
                    <p className="item-info">{item.name}</p>
                    <p className="item-info">{item.serial}</p>
                    <p className="item-info">{item.type}</p>
                    <p className="item-info">{item.status}</p>
                </div>
                <div className="buttons-manage">
                    <IconButton aria-label="edit" color="inherit">
                        <HistoryIcon onClick={toggleHistory}/>
                    </IconButton>
                </div>
        </div>
        {showHistory === true ? <History itemID={item.id}/> : false}
        </>
    )
}

export default ItemHistory
