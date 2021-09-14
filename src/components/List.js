import { useContext } from 'react'
import { EquipmentContext } from '../routes/View'
import IconButton from "@material-ui/core/IconButton"
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import axios from 'axios'

const List = ({item}) => {
    const { shown, showEquipment, setShowEquipment, setEqpID } = useContext(EquipmentContext)

    const toggleEquipment = (id) => {
        setShowEquipment(!showEquipment)
        setEqpID(id)
    }
    const downloadCertificate = (id) => {
        axios.get(`http://localhost:3005/certificate/${id}`).then((response)=>{
            console.log(typeof(response.data))
            alert("Calibration Certificate Downloaded.")
            //setEquip(response.data)
        })
    }

    return (
        <>
            {showEquipment === false ?
            <tr>
                <td>
                <IconButton aria-label="edit" color="inherit">
                    <OpenInNewIcon onClick={() => toggleEquipment(item.id)} />
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
                    <IconButton aria-label="edit" color="inherit">
                        <SaveAltIcon onClick={() => downloadCertificate(item.id)} />
                    </IconButton>
                </td> : null}
            </tr> : null}
        </>
    )
}

export default List
