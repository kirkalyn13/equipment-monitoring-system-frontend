import React from 'react'
import { useState } from 'react'
import Filter from './Filter'
import Equipment from './Equipment'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import SearchIcon from "@material-ui/icons/Search"
import SaveAltIcon from '@material-ui/icons/SaveAlt'

export const EquipmentContext = React.createContext()

const View = () => {
    const [equip, setEquip] = useState([])
    const [selected, setSelected] = useState(['name','serial','description'])

    const getEquip = () => {
        axios.get(`http://localhost:3005/allequipment`).then((response)=>{
            setEquip(response.data)
        })
    }

    const extractEquip = () => {
        axios.get(`http://localhost:3005/extract`).then(() =>{
            alert(`Extracted Equipment Data.`)
        })
    }
    return (
        <EquipmentContext.Provider value={{equip, selected, setSelected}}>
            <div className="container-view">
            <div className="container-filter">
                <div className="section-head">
                    <div className="section-title">
                        <img className="section-logo" src="/img/view.png" alt="" height="50px" width="50px" />
                        <h2 color="#FFFFFF">View Equipment</h2>
                    </div>
                    <div className="buttons">
                        <Button
                        onClick={getEquip} 
                        variant="contained"
                        style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                        startIcon={<SearchIcon />}
                        >
                        QUERY
                        </Button>
                        <Button
                        onClick={extractEquip}
                        variant="contained"
                        style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                        startIcon={<SaveAltIcon />}
                        >
                        EXTRACT
                        </Button>
                    </div>
                </div>
                <Filter />
            </div>
            <Equipment />
            </div>
        </EquipmentContext.Provider>
    )
}

export default View
