import React, { useState, useEffect} from 'react'
import { SERVER } from '../App'
import { DEPT } from '../App'
import List from '../components/List'
import History from '../components/History'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import IconButton from '@mui/material/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import CircularProgress from '@mui/material/CircularProgress'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import ColumnFilter from '../components/ColumnFilter'
import Equipment from '../components/Equipment'
import DataFilter from '../components/DataFilter'

export const EquipmentContext = React.createContext()

const View = () => {
    const [equip, setEquip] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const [showAll, setShowAll] = useState(true)
    const [loading, setLoading ] = useState(true)
    const [showEquipment, setShowEquipment] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const [eqpID, setEqpID ] = useState()
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState([])
    const [sortVal, setSortVal] = useState('')
    const [selectedSort, setSelectedSort] = useState('All')
    const [showFilterTab, setShowFilterTab] = useState(true)
    const [dataFilter, setDataFilter] = useState({
        column: '',
        data: 'All'
    })
    const [shown, setShown] = useState({
        showName: false,
        showType: false,
        showModel: false,
        showSerial: false,
        showDescription: false,
        showBrand: false,
        showPrice: false,
        showManufacturer: false,
        showExpiration: false,
        showPurchaseDate: false,
        showCalibrationDate: false,
        showNextCalibration: false,
        showCalibrationMethod: false,
        showForMaintenance: false,
        showLocation : false,
        showIssuedBy: false,
        showIssuedTo: false,
        showRemarks: false,
        showStatus: false,
        showCertificate: false,
    })

    const getEquip = () => {
        axios.get(`http://${SERVER}/allequipment`).then((response)=>{
            setEquip(response.data)
        })
    }

    const extractEquip = () => {
        axios.post(`http://${SERVER}/extract`,
            {shown, dataFilter }
          ).then((response)=>{
            var dtnow = new Date()
            var year = dtnow.getFullYear()
            var month = dtnow.getMonth() + 1
            var day = dtnow.getDate()
            var hour = dtnow.getHours()
            var min = dtnow.getMinutes()
            const dept = DEPT.replace(" ","")
            const file = response.data
            const filename = `${dept}Equipment_${year}${month}${day}${hour}${min}.csv`
            const link = document.createElement("a")
            link.href = file
            link.download = `${filename}.csv`
            link.click()
        }).catch((error) => console.log(error))
    }

    const toggleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    useEffect(()=>{
        setDataFilter({
            column: sortVal,
            data: selectedSort,
        })
        const sortedVal = equip.filter(val => {
            if(sortVal === ''){
                return val
            }else{
                if(selectedSort === 'All'){
                    return val
                }else{
                    switch(sortVal){
                        case "name":
                            return val.name === selectedSort
                            
                        case "type":
                            return val.type === selectedSort
                            
                        case "model":
                            return val.model === selectedSort
                            
                        case "serial":
                            return val.serial === selectedSort
                            
                        case "description":
                            return val.description === selectedSort
                            
                        case "brand":
                            return val.brand === selectedSort
                            
                        case "price":
                            return val.price === selectedSort
                            
                        case "manufacturer":
                            return val.manufacturer === selectedSort
                        case "expiration":
                            return val.expiration === selectedSort
                            
                        case "purchaseDate":
                            return val.purchaseDate === selectedSort
                            
                        case "calibrationDate":
                            return val.calibrationDate === selectedSort
                            
                        case "calibrationMethod":
                            return val.calibrationMethod === selectedSort
                            
                        case "nextCalibration":
                            return val.nextCalibration === selectedSort

                        case "forMaintenance":
                            return val.forMaintenance === selectedSort
                            
                        case "location":
                            return val.location === selectedSort
                            
                        case "issuedBy":
                            return val.issuedBy === selectedSort
                            
                        case "issuedTo":
                            return val.issuedTo === selectedSort
                            
                        case "remarks":
                            return val.remarks === selectedSort
                            
                        case "status":
                            return val.status === selectedSort
                            
                }
            }}
        })
        const searchedVal = sortedVal.filter(val => {
            if(search === ''){
                return val
            }else if(val.name.toLowerCase().includes(search.toLowerCase()) || val.serial.toLowerCase().includes(search.toLowerCase())){
                return val
            }})
        setSearched(searchedVal)
    },[search,sortVal,selectedSort])

    useEffect(()=>{
        if(showAll === true){
            setShown({
                showName: true,
                showType: true,
                showModel: true,
                showSerial: true,
                showDescription: true,
                showBrand: true,
                showPrice: true,
                showManufacturer: true,
                showExpiration: true,
                showPurchaseDate: true,
                showCalibrationDate: true,
                showNextCalibration: true,
                showCalibrationMethod: true,
                showForMaintenance: true,
                showLocation : true,
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
                showDescription: false,
                showBrand: false,
                showPrice: false,
                showManufacturer: false,
                showExpiration: false,
                showPurchaseDate: false,
                showCalibrationDate: false,
                showNextCalibration: false,
                showCalibrationMethod: false,
                showForMaintenance: false,
                showLocation : false,
                showIssuedBy: false,
                showIssuedTo: false,
                showRemarks: false,
                showStatus: false,
                showCertificate: false,
            })
        }
    },[showAll])

    const toggleViews = () => {
        setShowEquipment(false)
        setShowHistory(false)
        setShowFilterTab(true)
    }

    useEffect(() => {
        getEquip()
        setLoading(false)
    },[])

    useEffect(()=>{
        setSearched(equip)
    },[equip])

    useEffect(()=>{
        setSelectedSort('All')
    },[sortVal])

    return (
        <EquipmentContext.Provider value={{equip, showAll, setShowAll, shown, setShown, showEquipment, setShowEquipment, setEqpID, sortVal, setSortVal, selectedSort, setSelectedSort, showHistory, setShowHistory, setShowFilterTab }}>
            <div className="container-view">
            <div className="container-filter">
                <div className="section-head">
                    <div className="section-title">
                        <img className="section-logo" src="/img/view.png" alt="" height="50px" width="50px" />
                        <h2 color="#FFFFFF">View Equipment</h2>
                    </div>
                    <div className="search">
                        <div className="search-bar">
                        <label>Search Equipment: </label>
                        <input type="text" placeholder="Enter Name or Serial" onChange={event => {setSearch(event.target.value)}}/>
                        </div>       
                    </div>
                    <div className="buttons">
                        {showEquipment === false  && showHistory === false ?
                        <>
                        <Button
                        onClick={toggleShowFilter} 
                        variant="contained"
                        style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                        startIcon={<FilterListIcon />}
                        >
                        COLUMNS
                        </Button>
                        <Button
                        onClick={extractEquip}
                        variant="contained"
                        style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                        startIcon={<CloudDownloadIcon />}
                        >
                        EXTRACT
                        </Button>
                        </> : 
                        <Button
                        onClick={toggleViews}
                        variant="contained"
                        style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                        startIcon={<KeyboardReturnIcon />}
                        >
                        RETURN
                        </Button>}
                    </div>
                </div>
            {showFilter === true ? <ColumnFilter /> : null}
            {showFilterTab === true ? <DataFilter data={equip}/> : null}
            </div>
                <div className="container-equipment-list">
                    <table className="information">
                    {showEquipment === false && showHistory === false ?
                    <thead>
                    <tr>
                        <th>
                        <IconButton aria-label="edit" color="inherit" onClick={toggleShowFilter}>
                                <FilterListIcon />
                            </IconButton>
                        </th>
                        <th>HISTORY</th>
                        {shown.showName === true ? <th>NAME</th> : null}
                        {shown.showType === true ? <th>TYPE</th> : null}
                        {shown.showModel === true ? <th>MODEL</th> : null}
                        {shown.showSerial === true ? <th>SERIAL</th> : null}
                        {shown.showDescription === true ? <th>DESCRIPTION</th> : null}
                        {shown.showBrand === true ? <th>BRAND</th> : null}
                        {shown.showPrice === true ? <th>PRICE</th> : null}
                        {shown.showManufacturer === true ? <th>MANUFACTURER</th> : null}
                        {shown.showExpiration === true ? <th>EXPIRATION</th> : null}
                        {shown.showPurchaseDate === true ? <th>PURCHASE DATE</th> : null}
                        {shown.showCalibrationDate === true ? <th>LAST CALIBRATION</th> : null}
                        {shown.showNextCalibration === true ? <th>NEXT CALIBRATION</th> : null}
                        {shown.showCalibrationMethod === true ? <th>CALIBRATION METHOD</th> : null}
                        {shown.showForMaintenance === true ? <th>FOR MAINTENANCE</th> : null}
                        {shown.showLocation === true ? <th>LOCATION</th> : null}
                        {shown.showIssuedBy === true ? <th>ISSUED BY</th> : null}
                        {shown.showIssuedTo === true ? <th>ISSUED TO</th> : null}
                        {shown.showRemarks === true ? <th>REMARKS</th> : null}
                        {shown.showStatus === true ? <th>STATUS</th> : null}
                        {shown.showCertificate === true ? <th>CERTIFICATE</th> : null}
                    </tr>
                    </thead> : null}
                    {loading === true ? <CircularProgress color="inherit"/> : null}
                    {searched.map((item, key) => (<List key={key} item={item} />))}
                    </table>
                    {showEquipment === true ? <Equipment id={eqpID}/> : null}
                    {showHistory === true ? 
                    <>
                    <div className="container-search">
                        <div className="section-title">
                            <img className="section-logo" src="/img/history.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Equipment History</h2>
                        </div>
                    </div>
                    <History itemID={eqpID}/>
                    </> : null}
                </div>
            </div>
        </EquipmentContext.Provider>
    )
}

export default View
