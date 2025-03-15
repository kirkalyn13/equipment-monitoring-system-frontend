import React, { useState, useEffect } from 'react'
import { SERVER } from '../App'
import Item from '../components/Item'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Loading from '../components/Loading'

export const ReloadContext = React.createContext()

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

const Manage = () => {
    const [ items, setItems ] = useState([])
    const [ reload, setReload ] = useState(false)
    const [ search, setSearch ] = useState('')
    const [ filtered, setFiltered ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ statusList, setStatusList ] = useState([])
    const [ showItems, setShowItems ] = useState(true)
    const [ sortedStatus, setSortedStatus ] = useState("All")

    const getItems = () => {
        axios.get(`${SERVER}/allequipment`).then((response)=>{
            setItems(response.data)
            setFiltered(items)
            getStatusList(response.data)
        })
    } 

    const getStatusList = (data) => {
        const currentList = data.map(d => d.status)
        setStatusList(["All", ...new Set(currentList)])
    }

    const handleStatusSortVal = e => {
        setSortedStatus(e.target.value)
    }

    // Search logic
    useEffect(()=>{
        const searchedVal = items.filter(val => {
            if(search === ''){
                return val
            }else if(val.name.toLowerCase().includes(search.toLowerCase()) || val.serial.toLowerCase().includes(search.toLowerCase())){
                return val
            }})
        setFiltered(searchedVal)
    },[search])

    // Load items
    useEffect(()=>{
        setTimeout(()=>{
            getItems()
            setLoading(false)
          },500)
    },[reload])

    // Set Items upon reloading data
    useEffect(()=>{
        setFiltered(items)
    },[items])

    // Filter by status
    useEffect(()=>{
        if (sortedStatus === "All") setFiltered(items)
        else {
            const filteredByStatus = items.filter(item => item.status === sortedStatus)
            setFiltered(filteredByStatus)
        }
    },[sortedStatus])

    return (
        <ReloadContext.Provider value={{reload, setReload, showItems, setShowItems}}>
            <div className="container-manage">  
            <div className="container-search">
            <div className="section-title">
                <img className="section-logo" src="/img/manage.png" alt="" height="50px" width="50px" />
                <h2 color="#FFFFFF">Manage Equipment</h2>
            </div>
            <div className="status-filter">
            <label>Status:</label>
                    <Select
                        value={sortedStatus}
                        sx={selectStyle}
                        onChange={handleStatusSortVal}
                        color="secondary"      
                        >
                            {statusList.map(status => <MenuItem sx={itemStyle} value={status}>{status}</MenuItem>)}
                    </Select>
            </div>
            <div className="search">
                <div className="search-bar">
                <label>Search: </label>
                <input type="text" placeholder="Enter Name or Serial" onChange={event => {setSearch(event.target.value)}} />
                </div>       
            </div>
            </div>
            <div className="container-item-header">
                <div className="item-details">
                    <p className="item-header">NAME</p>
                    <p className="item-header">SERIAL NUMBER</p>
                    <p className="item-header">TYPE</p>
                    <p className="item-header">STATUS</p>
                </div>
            </div>
            {loading === true ? <Loading /> : null}
            {filtered.map((item) =>{
                    return  <Item key={item.serialNumber} item={item} />
                })}
            </div>
        </ReloadContext.Provider>
    )
}

export default Manage
