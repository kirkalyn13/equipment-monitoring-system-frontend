import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

const Equipment = ({id}) => {
    const [ equipment, setEquipment ] = useState({})
    const getEquipData = () => {
    axios.get(`http://localhost:3005/equipment/${id}`).then((response)=>{
        setEquipment(response.data[0])
        })
    }
    useEffect(()=>{
        getEquipData()
    },[])

    return (
        <div className="container-equipment-info">
        <div className="section-head">
            <div className="section-title">
                <img className="section-logo" src="/img/information.png" alt="" height="50px" width="50px" />
                <h2 color="#FFFFFF">Equipment Information</h2>
            </div>
        </div>
            <div className="container-details">
                <div className="details">
                    <div className="details-column">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/info.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">General Information</h2>
                        </div>
                        <label>Name: {equipment.name}</label>
                        <label>Type: </label>
                        <label>Model: </label>
                        <label>Serial: </label>
                        <label>Description: </label>
                    </div>
                    <div className="details-column">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/purchase.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Purchase Details</h2>
                        </div>
                        <label>Brand: </label>
                        <label>Manufacturer: </label>
                        <label>Price: </label>
                        <label>Expiration: </label>
                        <label>Purchase Date: </label>
                    </div>
                </div>
            </div>
            <div className="container-details">
                <div className="details">
                    <div className="details-column">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/calibration.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Calibration Details</h2>
                        </div>
                        <label>Calibration Date: </label>
                        <label>Next Calibration Date: </label>
                        <label>Calibration Method: </label>
                        <label>Certificate: </label>
                    </div>
                    <div className="details-column">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/others.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Other Details</h2>
                        </div>
                        <label>Issued By: </label>
                        <label>Issued To: </label>
                        <label>Location: </label>
                        <label>Status: </label>  
                        <label>Remarks: </label>
                    </div>
                </div>
            </div>
            <div className="btn-add">
                <Button 
                variant="contained"
                style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold"}}
                startIcon={<KeyboardReturnIcon />}
                >
                UPDATE EQUIPMENT INFO
                </Button>
            </div>
    </div>
    )
}

export default Equipment
