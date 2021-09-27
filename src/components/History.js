import React, { useState, useEffect } from 'react'
import { SERVER } from '../App'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import SaveAltIcon from '@mui/icons-material/SaveAlt'

const History = ({itemID}) => {
    const [logs, setLogs ] = useState([])
    const fetchLogs = () => {
        axios.get(`http://${SERVER}/logs/${itemID}`).then((response)=>{
            setLogs(response.data)
        }
        )}
    
    
    const downloadCertificate = (id, timestamp) => {
            axios.get(`http://${SERVER}/changelog/certificate/${id}/${timestamp}`)
            .then((response) => {   
                const file = response.data[0].certificate
                const filename = `calibration_certificate_${id}`
                const link = document.createElement("a")
                link.href = file
                link.download = `${filename}.pdf`
                link.click()
            })
            .catch((error) => console.log(error))
        }

    useEffect(()=>{
        fetchLogs()
    },[])

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
                <th>CERTIFICATE</th>
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
                        <td>
                            {entry.certificate !== null ?(<IconButton aria-label="edit" color="inherit">
                                <SaveAltIcon onClick={() => downloadCertificate(entry.id, entry.timestamp)} />
                            </IconButton>) : null}
                        </td>
                    </tr>
                )
            })}
        </table>
        </div>
    )
}

export default History
