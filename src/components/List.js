import { useContext } from 'react'
import { EquipmentContext } from '../routes/View'
import { SERVER } from '../App'
import IconButton from '@mui/material/IconButton'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import axios from 'axios'


const List = ({item}) => {
    const { shown, showEquipment, setShowEquipment, setEqpID } = useContext(EquipmentContext)
    
    const toggleEquipment = (id) => {
        setShowEquipment(!showEquipment)
        setEqpID(id)
    }

    const downloadCertificate = (id) => {
        axios.get(`http://${SERVER}/certificate/${id}`)
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
            {showEquipment === false ?
            <tbody>
            <tr>
                <td>
                <IconButton aria-label="edit" color="inherit" onClick={() => toggleEquipment(item.id)}>
                    <OpenInNewIcon  />
                </IconButton>
                </td>
                {shown.showName === true ? <td>{item.name}</td> : null}
                {shown.showType === true ? <td>{item.type}</td> : null}
                {shown.showModel === true ? <td>{item.model}</td> : null}
                {shown.showSerial === true ? <td>{item.serial}</td> : null}
                {shown.showDesc === true ? <td>{item.description}</td> : null}
                {shown.showBrand === true ? <td>{item.brand}</td> : null}
                {shown.showPrice === true ? <td>{item.price}</td> : null}
                {shown.showManufacturer === true ? <td>{item.manufacturer}</td> : null}
                {shown.showExp === true ? <td>{item.expiration}</td> : null}
                {shown.showPurchaseDate === true ? <td>{item.purchaseDate}</td> : null}
                {shown.showCalibDate === true ? <td>{item.calibrationDate}</td> : null}
                {shown.showNextCalib === true ? <td>{item.nextCalibration}</td> : null}
                {shown.showCalibMethod === true ? <td>{item.calibrationMethod}</td> : null}
                {shown.showLoc === true ? <td>{item.location}</td> : null}
                {shown.showIssuedBy === true ? <td>{item.issuedBy}</td> : null}
                {shown.showIssuedTo === true ? <td>{item.issuedTo}</td> : null}
                {shown.showRemarks === true ? <td>{item.remarks}</td> : null}
                {shown.showStatus === true ? <td>{item.status}</td> : null}
                {shown.showCertificate === true ? <td>
                    {item.certificate !== null ? (<IconButton aria-label="edit" color="inherit" onClick={() => downloadCertificate(item.id)}>
                        <SaveAltIcon />
                    </IconButton>) : null}
                </td> : null}
            </tr></tbody> : null}
        </>
    )
}

export default List
