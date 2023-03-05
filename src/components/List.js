import { useContext } from 'react'
import { EquipmentContext } from '../routes/View'
import { SERVER } from '../App'
import IconButton from '@mui/material/IconButton'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import HistoryIcon from '@mui/icons-material/History'
import { useHistory } from "react-router-dom"
import axios from 'axios'


const List = ({item}) => {
    let history = useHistory()
    const { shown, showEquipment, setShowEquipment, setEqpID, showHistory, setShowHistory, setShowFilterTab } = useContext(EquipmentContext)
    
    const toggleEquipment = (id) => {
        history.push(`equipment/${id}`)
        setShowEquipment(true)
        setShowFilterTab(false)
        setEqpID(id)
    }

    const toggleHistory = (id) => {
        setShowHistory(true)
        setShowFilterTab(false)
        setEqpID(id)
    }

    const downloadCertificate = (id) => {
        axios.get(`https://${SERVER}/certificate/${id}`)
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

    return (
        <>
            {showEquipment === false && showHistory === false ?
            <tbody>
            <tr>
                <td>
                <IconButton aria-label="edit" color="inherit" onClick={() => toggleEquipment(item.id)}>
                    <OpenInNewIcon  />
                </IconButton>
                </td>
                <td>
                <IconButton aria-label="edit" color="inherit" onClick={() => toggleHistory(item.id)}>
                    <HistoryIcon  />
                </IconButton>
                </td>
                {shown.showName === true ? <td>{item.name}</td> : null}
                {shown.showType === true ? <td>{item.type}</td> : null}
                {shown.showModel === true ? <td>{item.model}</td> : null}
                {shown.showSerial === true ? <td>{item.serial}</td> : null}
                {shown.showDescription === true ? <td>{item.description}</td> : null}
                {shown.showBrand === true ? <td>{item.brand}</td> : null}
                {shown.showPrice === true ? <td>{item.price}</td> : null}
                {shown.showManufacturer === true ? <td>{item.manufacturer}</td> : null}
                {shown.showExpiration === true ? <td>{item.expiration}</td> : null}
                {shown.showPurchaseDate === true ? <td>{item.purchaseDate}</td> : null}
                {shown.showCalibrationDate === true ? <td>{item.calibrationDate}</td> : null}
                {shown.showNextCalibration === true ? <td>{item.nextCalibration}</td> : null}
                {shown.showCalibrationMethod === true ? <td>{item.calibrationMethod}</td> : null}
                {shown.showForMaintenance === true ? <td>{item.forMaintenance}</td> : null}
                {shown.showLocation === true ? <td>{item.location}</td> : null}
                {shown.showIssuedBy === true ? <td>{item.issuedBy}</td> : null}
                {shown.showIssuedTo === true ? <td>{item.issuedTo}</td> : null}
                {shown.showRemarks === true ? <td>{item.remarks}</td> : null}
                {shown.showStatus === true ? <td>{item.status}</td> : null}
                {shown.showCertificate === true ? <td>
                    {item.certificate !== null ? (<IconButton aria-label="edit" color="inherit" onClick={() => downloadCertificate(item.id)}>
                        <SaveAltIcon />
                    </IconButton>) : null}
                </td> : null}
            </tr>
            </tbody> 
            : null}
        </>
    )
}

export default List
