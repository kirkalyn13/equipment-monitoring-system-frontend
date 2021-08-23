import { useContext } from 'react'
import { EquipmentContext } from './View'

const Equipment = () => {
    const { equip, selected } = useContext(EquipmentContext)

    return (
        <table className="information">
            <tr>
                {selected.includes("name") ? <th>NAME</th> : null}
                {selected.includes("type") ? <th>TYPE</th> : null}
                {selected.includes("model") ? <th>MODEL</th> : null}
                {selected.includes("serial") ? <th>SERIAL</th> : null}
                {selected.includes("description") ? <th>DESCRIPTION</th> : null}
                {selected.includes("brand") ? <th>BRAND</th> : null}
                {selected.includes("price") ? <th>PRICE</th> : null}
                {selected.includes("manufacturer") ? <th>MANUFACTURER</th> : null}
                {selected.includes("expiration") ? <th>EXPIRATION</th> : null}
                {selected.includes("purchaseDate") ? <th>PURCHASE DATE</th> : null}
                {selected.includes("calibrationDate") ? <th>LAST CALIBRATION</th> : null}
                {selected.includes("nextCalibration") ? <th>NEXT CALIBRATION</th> : null}
                {selected.includes("calibrationMethod") ? <th>CALIBRATION METHOD</th> : null}
                {selected.includes("location") ? <th>LOCATION</th> : null}
                {selected.includes("issuedBy") ? <th>ISSUED BY</th> : null}
                {selected.includes("issuedTo") ? <th>ISSUED TO</th> : null}
                {selected.includes("remarks") ? <th>REMARKS</th> : null}
            </tr>
            {equip.map(entry => {
                return(
                    <tr>
                        {selected.includes("name") ? <td>{entry.name}</td> : null}
                        {selected.includes("type") ? <td>{entry.type}</td> : null}
                        {selected.includes("model") ? <td>{entry.model}</td> : null}
                        {selected.includes("serial") ? <td>{entry.serial}</td> : null}
                        {selected.includes("description") ? <td>{entry.description}</td> : null}
                        {selected.includes("brand") ? <td>{entry.brand}</td> : null}
                        {selected.includes("price") ? <td>{entry.price}</td> : null}
                        {selected.includes("manufacturer") ? <td>{entry.manufacturer}</td> : null}
                        {selected.includes("expiration") ? <td>{entry.expiration}</td> : null}
                        {selected.includes("purchaseDate") ? <td>{entry.purchaseDate}</td> : null}
                        {selected.includes("calibrationDate") ? <td>{entry.calibrationDate}</td> : null}
                        {selected.includes("nextCalibration") ? <td>{entry.nextCalibration}</td> : null}
                        {selected.includes("calibrationMethod") ? <td>{entry.calibrationMethod}</td> : null}
                        {selected.includes("location") ? <td>{entry.location}</td> : null}
                        {selected.includes("issuedBy") ? <td>{entry.issuedBy}</td> : null}
                        {selected.includes("issuedTo") ? <td>{entry.issuedTo}</td> : null}
                        {selected.includes("remarks") ? <td>{entry.remarks}</td> : null}
                    </tr> 
                )
            })}
        </table>
    )
}

export default Equipment
