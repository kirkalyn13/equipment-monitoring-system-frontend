import React, { useState, useEffect } from 'react'
import { SERVER } from '../App'
import { b64toBlob, getDateFromTimestamp } from '../util/util'
import { useHistory, useParams } from "react-router-dom"
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { Button } from '@mui/material'

const History = () => {
    const { id } = useParams()
    const history = useHistory()
    const [logs, setLogs ] = useState([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchLogs = () => {
        axios.get(`${SERVER}/changelogs/${id}`).then((response)=>{
            setLogs(response.data)
            }
        )}
    
    
    const viewCertificate = (itemId, logId) => {
            axios.get(`${SERVER}/changelogs/${itemId}/${logId}/certificate`)
            .then((response) => {   
                let pdfData = response.data[0].certificate.substring("data:application/pdf;base64,".length)
                let pdfBlob = b64toBlob(pdfData.replace('data:application/pdf;base64,', ''), 'application/pdf')
                let pdfUrl = URL.createObjectURL(pdfBlob)
                window.open(pdfUrl)
            })
            .catch((error) => console.error(error))
        }

        const returnToView = () => {
            history.push("/view")
        }

        useEffect(()=>{
            fetchLogs()
        },[])

    return (
        <>
            <div className="container-history">
            <div className="section-head container-filter">
                <div className="section-title">
                    <img className="section-logo" src="/img/history.png" alt="" height="50px" width="50px" />
                    <h2 color="#FFFFFF">Equipment History</h2>
                </div>
                <Button
                    onClick={returnToView}
                    variant="contained"
                    style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                    startIcon={<KeyboardReturnIcon />}
                    >
                    RETURN
                </Button>
            </div>
            <div className='history-wrapper'>
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
                            <td>{getDateFromTimestamp(entry.expiration)}</td>
                            <td>{getDateFromTimestamp(entry.purchasedate)}</td>
                            <td>{getDateFromTimestamp(entry.calibrationdate)}</td>
                            <td>{getDateFromTimestamp(entry.nextcalibration)}</td>
                            <td>{entry.calibrationmethod}</td>
                            <td>{entry.formaintenance}</td>
                            <td>{entry.location}</td>
                            <td>{entry.issuedby}</td>
                            <td>{entry.issuedto}</td>
                            <td>{entry.status}</td>
                            <td>{entry.remarks}</td>
                            <td>
                                <IconButton
                                    disabled={entry.certificate === null || entry.certificate === "null"}
                                    aria-label="edit" 
                                    color="inherit">
                                    <OpenInBrowserIcon onClick={() => viewCertificate(entry.id, entry.indexnum)} />
                                </IconButton>
                            </td>
                            <td>{entry.modifiedby}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
            </div>
        </>
    )
}

export default History
