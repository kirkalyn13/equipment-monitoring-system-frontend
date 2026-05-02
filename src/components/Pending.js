import { useHistory } from "react-router-dom"
import { getDateFromTimestamp } from "../util/util"

const Pending = ({pending}) => {
    let history = useHistory()

    const openPending = (id) => {
        history.push(`/equipment/${id}`)
    }

    return (
        <div className="pending">
                <h2 style={{color:"#000"}}>Pending Calibrations</h2>
                <table style={{width: "95%"}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Next Calibration</th>
                        <th>Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pending.map((entry, key) => {
                    return(
                        
                        <tr key={entry.id} onClick={() => openPending(entry.id)}>
                            <td className="td-critical">{entry.name}</td>
                            <td className="td-critical">{entry.type}</td>
                            <td className="td-critical">{getDateFromTimestamp(entry.nextcalibration)}</td>
                            <td className="td-critical">{entry.location}</td>
                        </tr> 
                    )
                })}
                    </tbody>
                </table>
            </div> 
    )
}

export default Pending
