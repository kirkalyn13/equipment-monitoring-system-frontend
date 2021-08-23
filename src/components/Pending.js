import React from 'react'

const Pending = ({pending}) => {
    
    return (
        <div className="pending">
                <h2>Pending Calibrations</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Next Calibration</th>
                    </tr>
                    {pending.map(entry => {
                    return(
                        <tr>
                            <td>{entry.name}</td>
                            <td>{entry.type}</td>
                            <td>{entry.nextCalibration}</td>
                        </tr> 
                    )
                })}
                </table>
            </div> 
    )
}

export default Pending
