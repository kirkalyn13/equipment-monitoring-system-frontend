import React, { useState, useEffect } from 'react'
import axios from 'axios'

const History = ({itemID}) => {
    const [logs, setLogs ] = useState([])
    const fetchLogs = () => {
        axios.get(`http://localhost:3005/logs/${itemID}`).then((response)=>{
            setLogs(response.data)
        }
        )}

    useEffect(()=>{
        fetchLogs()
    },[])

    useEffect(()=>{
        console.log(logs)
    },[logs])

    return (
        <div className="container-history">
        <table className="history">
            <tr>
                <th>TIMESTAMP</th>
                <th>NAME</th>
                <th>TYPE</th>
                <th>MODEL</th>
                <th>SERIAL</th>
                <th>DESCRIPTION</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>MANUFACTURER</th>
                <th>EXPIRATION</th>
                <th>PURCHASE DATE</th>
                <th>LAST CALIBRATION</th>
                <th>NEXT CALIBRATION</th>
                <th>CALIBRATION METHOD</th>
                <th>LOCATION</th>
                <th>ISSUED BY</th>
                <th>ISSUED TO</th>
                <th>STATUS</th>
                <th>REMARKS</th>
            </tr>
            {logs.map(entry => {
                return(
                    <tr>
                        <td>{entry.timestamp}</td>
                        <td>{entry.name}</td>
                        <td>{entry.type}</td>
                        <td>{entry.model}</td>
                        <td>{entry.serial}</td>
                        <td>{entry.description}</td>
                        <td>{entry.brand}</td>
                        <td>{entry.price}</td>
                        <td>{entry.manufacturer}</td>
                        <td>{entry.expiration}</td>
                        <td>{entry.purchaseDate}</td>
                        <td>{entry.calibrationDate}</td>
                        <td>{entry.nextCalibration}</td>
                        <td>{entry.calibrationMethod}</td>
                        <td>{entry.location}</td>
                        <td>{entry.issuedBy}</td>
                        <td>{entry.issuedTo}</td>
                        <td>{entry.status}</td>
                        <td>{entry.remarks}</td>
                    </tr>
                )
            })}
        </table>
        </div>
    )
}

export default History
