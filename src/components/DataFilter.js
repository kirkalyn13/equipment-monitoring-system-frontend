import React, { useState, useEffect, useContext } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { EquipmentContext } from '../routes/View'

const selectStyle = {
    backgroundColor: '#FFF', 
    color: '#212121',
    width: '50%',
    fontWeight: 'bold',
    height: '40px',
    margin: '1rem'
}
const itemStyle = { 
    color: '#000',
    width: '100%',
    fontWeight: 'bold',
}

const DataFilter = ({data}) => {
    const [sortList, setSortList] = useState([])
    const {sortVal, setSortVal, selectedSort, setSelectedSort} = useContext(EquipmentContext)

    const handleChangeSortVal = (e) => {
        setSortVal(e.target.value)
      }
    
    const handleChangeSelectedSort = (e) => {
        setSelectedSort(e.target.value)
      }

    useEffect(()=>{
        let sortDataList = []
        switch(sortVal){
            case "name":
                sortDataList = data.map(val => val.name)
                break
            case "type":
                sortDataList = data.map(val => val.type)
                break
            case "model":
                sortDataList = data.map(val => val.model)
                break
            case "serial":
                sortDataList = data.map(val => val.serial)
                break
            case "description":
                sortDataList = data.map(val => val.description)
                break
            case "brand":
                sortDataList = data.map(val => val.brand)
                break
            case "price":
                sortDataList = data.map(val => val.price)
                break
            case "manufacturer":
                sortDataList = data.map(val => val.manufacturer)
                break
            case "expiration":
                sortDataList = data.map(val => val.expiration)
                break
            case "purchaseDate":
                sortDataList = data.map(val => val.purchaseDate)
                break
            case "calibrationDate":
                sortDataList = data.map(val => val.calibrationDate)
                break
            case "calibrationMethod":
                sortDataList = data.map(val => val.alibrationMethod)
                break
            case "nextCalibration":
                sortDataList = data.map(val => val.nextCalibration)
                break
            case "location":
                sortDataList = data.map(val => val.location)
                break
            case "issuedBy":
                sortDataList = data.map(val => val.issuedBy)
                break
            case "issuedTo":
                sortDataList = data.map(val => val.issuedTo)
                break
            case "remarks":
                sortDataList = data.map(val => val.remarks)
                break
            case "status":
                sortDataList = data.map(val => val.status)
                break
            default:
                sortDataList = []
        }
        const sortListUnique = [...new Set(sortDataList.sort())]
        setSortList(['All', ...sortListUnique])
    },[sortVal])

    return (
        <div className="section-head">
        <div className="section-title">
            <h3>Filter By:</h3>
            <div className="container-sort">
            <Select
                value={sortVal}
                sx={selectStyle}
                onChange={handleChangeSortVal}
                color="secondary"      
                >
                    <MenuItem sx={itemStyle} value={""}>All</MenuItem>
                    <MenuItem sx={itemStyle} value={"name"}>Name</MenuItem>
                    <MenuItem sx={itemStyle} value={"type"}>Type</MenuItem>
                    <MenuItem sx={itemStyle} value={"model"}>Model</MenuItem>
                    <MenuItem sx={itemStyle} value={"serial"}>Serial</MenuItem>
                    <MenuItem sx={itemStyle} value={"description"}>Description</MenuItem>
                    <MenuItem sx={itemStyle} value={"brand"}>Brand</MenuItem>
                    <MenuItem sx={itemStyle} value={"price"}>Value</MenuItem>
                    <MenuItem sx={itemStyle} value={"manufacturer"}>Manufacturer</MenuItem>
                    <MenuItem sx={itemStyle} value={"expiration"}>Expiration</MenuItem>
                    <MenuItem sx={itemStyle} value={"purchaseDate"}>Purchase Date</MenuItem>
                    <MenuItem sx={itemStyle} value={"calibrationDate"}>Calibration Date</MenuItem>
                    <MenuItem sx={itemStyle} value={"calibrationMethod"}>Calibration Method</MenuItem>
                    <MenuItem sx={itemStyle} value={"nextCalibration"}>Next Calibration</MenuItem>
                    <MenuItem sx={itemStyle} value={"location"}>Location</MenuItem>
                    <MenuItem sx={itemStyle} value={"issuedBy"}>Issued By</MenuItem>
                    <MenuItem sx={itemStyle} value={"issuedTo"}>Issued To</MenuItem>
                    <MenuItem sx={itemStyle} value={"remarks"}>Remarks</MenuItem>
                    <MenuItem sx={itemStyle} value={"status"}>Status</MenuItem>
                </Select>
                <Select
                value={selectedSort}
                sx={selectStyle}
                onChange={handleChangeSelectedSort}
                color="secondary"
                >
                    {sortList.map((val, key) => <MenuItem key={key} sx={itemStyle} value={val}>{val}</MenuItem>)}
                </Select>
            </div>
        </div>
    </div>       
    )
}

export default DataFilter
