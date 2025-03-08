import React, { useState, useEffect } from 'react'
import { SERVER } from '../App'
import { b64toBlob } from '../util/util'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'

const History = ({itemID}) => {
    const [logs, setLogs ] = useState([])
    const fetchLogs = () => {
        axios.get(`${SERVER}/logs/${itemID}`).then((response)=>{
            setLogs(response.data)
        }
        )}
    
    
    const viewCertificate = (id, timestamp) => {
            axios.get(`${SERVER}/changelog/certificate/${id}/${timestamp}`)
            .then((response) => {   
                let pdfData = response.data[0].certificate.substring("data:application/pdf;base64,".length)
                let pdfBlob = b64toBlob(pdfData.replace('data:application/pdf;base64,', ''), 'application/pdf')
                let pdfUrl = URL.createObjectURL(pdfBlob)
                window.open(pdfUrl)
            })
            .catch((error) => console.error(error))
        }


    useEffect(()=>{
        fetchLogs()
    },[])

    return (
        <div className="container-history">
        <table className="history">
            <thead>
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
                <th>FOR MAINTENANCE</th>
                <th>LOCATION</th>
                <th>ISSUED BY</th>
                <th>ISSUED TO</th>
                <th>STATUS</th>
                <th>REMARKS</th>
                <th>CERTIFICATE</th>
                <th>MODIFIED BY</th>
            </tr>
            </thead>
            <tbody>
            {logs.map((entry, key) => {
                return(
                    <tr key={key}>
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
                        <td>{entry.forMaintenance}</td>
                        <td>{entry.location}</td>
                        <td>{entry.issuedBy}</td>
                        <td>{entry.issuedTo}</td>
                        <td>{entry.status}</td>
                        <td>{entry.remarks}</td>
                        <td>
                            <IconButton
                                disabled={entry.certificate === null || entry.certificate === "null"}
                                aria-label="edit" 
                                color="inherit">
                                <OpenInBrowserIcon onClick={() => viewCertificate(entry.id, entry.timestamp)} />
                            </IconButton>
                        </td>
                        <td>{entry.modifiedBy}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    )
}

export default History
