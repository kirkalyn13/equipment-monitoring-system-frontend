import React from 'react'

const Pending = ({pending}) => {
    
    return (
        <div className="pending">
                <h2 style={{color:"#000"}}>Pending Calibrations</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Next Calibration</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pending.map((entry, key) => {
                    return(
                        
                        <tr key={key}>
                            <td className="td-critical">{entry.name}</td>
                            <td className="td-critical">{entry.type}</td>
                            <td className="td-critical">{entry.nextCalibration}</td>
                        </tr> 
                    )
                })}
                    </tbody>
                </table>
            </div> 
    )
}

export default Pending
