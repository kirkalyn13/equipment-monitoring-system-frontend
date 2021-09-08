import React, { useState, useEffect } from 'react'
import List from './List'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter from './Filter'

export const EquipmentContext = React.createContext()

const View = () => {
    const [equip, setEquip] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const [showAll, setShowAll] = useState(true)
    const [shown, setShown] = useState({
        showName: false,
        showType: false,
        showModel: false,
        showSerial: false,
        showDesc: false,
        showBrand: false,
        showPrice: false,
        showManufacturer: false,
        showExp: false,
        showPurchaseDate: false,
        showCalibDate: false,
        showNextCalib: false,
        showCalibMethod: false,
        showLoc : false,
        showIssuedBy: false,
        showIssuedTo: false,
        showRemarks: false,
        showStatus: false,
        showCertificate: false,
    })

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

    const toggleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    useEffect(()=>{
        if(showAll === true){
            setShown({
                showName: true,
                showType: true,
                showModel: true,
                showSerial: true,
                showDesc: true,
                showBrand: true,
                showPrice: true,
                showManufacturer: true,
                showExp: true,
                showPurchaseDate: true,
                showCalibDate: true,
                showNextCalib: true,
                showCalibMethod: true,
                showLoc : true,
                showIssuedBy: true,
                showIssuedTo: true,
                showRemarks: true,
                showStatus: true,
                showCertificate: true,
            })
        }
        if(showAll === false){
            setShown({
                showName: false,
                showType: false,
                showModel: false,
                showSerial: false,
                showDesc: false,
                showBrand: false,
                showPrice: false,
                showManufacturer: false,
                showExp: false,
                showPurchaseDate: false,
                showCalibDate: false,
                showNextCalib: false,
                showCalibMethod: false,
                showLoc : false,
                showIssuedBy: false,
                showIssuedTo: false,
                showRemarks: false,
                showStatus: false,
                showCertificate: false,
            })
        }
    },[showAll])

    useEffect(() => {
        console.log(shown)
    },[shown])

    return (
        <EquipmentContext.Provider value={{equip, showAll, setShowAll, shown, setShown}}>
            <div className="container-view">
            <div className="container-filter">
                <div className="section-head">
                    <div className="section-title">
                        <img className="section-logo" src="/img/view.png" alt="" height="50px" width="50px" />
                        <h2 color="#FFFFFF">View Equipment</h2>
                    </div>
                    <div className="buttons">
                        <Button
                        onClick={toggleShowFilter} 
                        variant="contained"
                        style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                        startIcon={<FilterListIcon />}
                        >
                        FILTER
                        </Button>
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
            {showFilter === true ? <Filter /> : null}
            </div>
                <div className="container-equipment-list">
                <table className="information">
                    <tr>
                        <th>
                        <IconButton aria-label="edit" color="inherit">
                                <FilterListIcon onClick={toggleShowFilter} />
                            </IconButton>
                        </th>
                        {shown.showName === true ? <th>NAME</th> : null}
                        {shown.showType === true ? <th>TYPE</th> : null}
                        {shown.showModel === true ? <th>MODEL</th> : null}
                        {shown.showSerial === true ? <th>SERIAL</th> : null}
                        {shown.showDesc === true ? <th>DESCRIPTION</th> : null}
                        {shown.showBrand === true ? <th>BRAND</th> : null}
                        {shown.showPrice === true ? <th>PRICE</th> : null}
                        {shown.showManufacturer === true ? <th>MANUFACTURER</th> : null}
                        {shown.showExp === true ? <th>EXPIRATION</th> : null}
                        {shown.showPurchaseDate === true ? <th>PURCHASE DATE</th> : null}
                        {shown.showCalibDate === true ? <th>LAST CALIBRATION</th> : null}
                        {shown.showNextCalib === true ? <th>NEXT CALIBRATION</th> : null}
                        {shown.showCalibMethod === true ? <th>CALIBRATION METHOD</th> : null}
                        {shown.showLoc === true ? <th>LOCATION</th> : null}
                        {shown.showIssuedBy === true ? <th>ISSUED BY</th> : null}
                        {shown.showIssuedTo === true ? <th>ISSUED TO</th> : null}
                        {shown.showRemarks === true ? <th>REMARKS</th> : null}
                        {shown.showStatus === true ? <th>STATUS</th> : null}
                        {shown.showCertificate === true ? <th>CERTIFICATE</th> : null}
                    </tr>
                    {equip.map(item => <List item={item} />)}
                    </table>
                </div>
            </div>
        </EquipmentContext.Provider>
    )
}

export default View
