import React from 'react'
import { useState, useEffect } from 'react'
import Item from './Item'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

export const ReloadContext = React.createContext()

const Manage = () => {
    const [ items, setItems ] = useState([])
    const [ reload, setReload ] = useState(false)
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([])
    const [ loading, setLoading] = useState(true)

    const getItems = () => {
        axios.get(`http://localhost:3005/allequipment`).then((response)=>{
            setItems(response.data)
            setFiltered(items)
        })
    } 

    useEffect(()=>{
        const searchedVal = items.filter(val => {
            if(search === ''){
                return val
            }else if(val.name.toLowerCase().includes(search.toLowerCase()) || val.serial.toLowerCase().includes(search.toLowerCase())){
                return val
            }})
        setFiltered(searchedVal)
    },[search])

    useEffect(()=>{
        setTimeout(()=>{
            getItems()
            setLoading(false)
          },500)
    },[reload])

    useEffect(()=>{
        setFiltered(items)
    },[items])

    return (
        <ReloadContext.Provider value={{reload, setReload}}>
            <div className="container-manage">  
            <div className="container-search">
            <div className="section-title">
                <img className="section-logo" src="/img/manage.png" alt="" height="50px" width="50px" />
                <h2 color="#FFFFFF">Manage Equipment</h2>
            </div>
            <div className="search">
                <div className="search-bar">
                <label>Search Equipment: </label>
                <input type="text" placeholder="Enter Name or Serial" onChange={event => {setSearch(event.target.value)}}/>
                </div>       
            </div>
            </div>
            <div className="container-item-header">
                <div className="item-details">
                    <p className="item-header">NAME</p>
                    <p className="item-header">SERIAL NUMBER</p>
                    <p className="item-header">TYPE</p>
                    <p className="item-header">DESCRIPTION</p>
                </div>
            </div>
            {loading === true ? <CircularProgress color="inherit"/> : null}
            {filtered.map(item =>{
                    return  <Item item={item} />
                })}
            </div>
        </ReloadContext.Provider>
    )
}

export default Manage
