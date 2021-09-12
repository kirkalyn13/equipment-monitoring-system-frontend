import { useContext } from 'react'
import { EquipmentContext } from './View'
import IconButton from "@material-ui/core/IconButton"
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import SaveAltIcon from '@material-ui/icons/SaveAlt'

const List = ({item}) => {
    const { shown, showEquipment, setShowEquipment, setEqpID } = useContext(EquipmentContext)

    const toggleEquipment = (id) => {
        setShowEquipment(!showEquipment)
        setEqpID(id)
    }

    return (
        <>
            {showEquipment === false ?
            <tr>
                <td width="200">
                <IconButton aria-label="edit" color="inherit">
                    <OpenInNewIcon onClick={() => toggleEquipment(item.id)} />
                </IconButton>
                </td>
                {shown.showName === true ? <td width="200">{item.name}</td> : null}
                {shown.showType === true ? <td width="200">{item.type}</td> : null}
                {shown.showModel === true ? <td width="200">{item.model}</td> : null}
                {shown.showSerial === true ? <td width="200">{item.serial}</td> : null}
                {shown.showDesc === true ? <td width="200">{item.description}</td> : null}
                {shown.showBrand === true ? <td width="200">{item.brand}</td> : null}
                {shown.showPrice === true ? <td width="200">{item.price}</td> : null}
                {shown.showManufacturer === true ? <td width="200">{item.manufacturer}</td> : null}
                {shown.showExp === true ? <td width="200">{item.expiration}</td> : null}
                {shown.showPurchaseDate === true ? <td width="200">{item.purchaseDate}</td> : null}
                {shown.showCalibDate === true ? <td width="200">{item.calibrationDate}</td> : null}
                {shown.showNextCalib === true ? <td width="200">{item.nextCalibration}</td> : null}
                {shown.showCalibMethod === true ? <td width="200">{item.calibrationMethod}</td> : null}
                {shown.showLoc === true ? <td width="200">{item.location}</td> : null}
                {shown.showIssuedBy === true ? <td width="200">{item.issuedBy}</td> : null}
                {shown.showIssuedTo === true ? <td width="200">{item.issuedTo}</td> : null}
                {shown.showRemarks === true ? <td width="200">{item.remarks}</td> : null}
                {shown.showStatus === true ? <td width="200">{item.status}</td> : null}
                {shown.showCertificate === true ? <td width="200">
                    <IconButton aria-label="edit" color="inherit">
                        <SaveAltIcon /*onClick={toggleEquipment}*/ />
                    </IconButton>
                </td> : null}
            </tr> : null}
        </>
    )
}

export default List
