import { useState, useEffect,useContext } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import { EquipmentContext } from '../routes/View'

const Equipment = ({id}) => {
    const { setShowEquipment, setEqpID } = useContext(EquipmentContext)
    const [ equipment, setEquipment ] = useState({})
    const getEquipData = () => {
    axios.get(`http://localhost:3005/equipment/${id}`).then((response)=>{
        setEquipment(response.data[0])
        })
    }
    const returnToView = () => {
        setShowEquipment(false)
        setEqpID()
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
                    <div className="details-column-info">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/info.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">General Information</h2>
                        </div>
                        <div className="view-info-label"><p>Name: </p><p>{equipment.name}</p></div>
                        <div className="view-info-label"><p>Type: </p><p>{equipment.type}</p></div>
                        <div className="view-info-label"><p>Model: </p><p>{equipment.model}</p></div>
                        <div className="view-info-label"><p>Serial: </p><p>{equipment.serial}</p></div>
                        <div className="view-info-label"><p>Description: </p><p>{equipment.description}</p></div>
                    </div>
                    <div className="details-column-info">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/purchase.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Purchase Details</h2>
                        </div>
                        <div className="view-info-label"><p>Brand: </p><p>{equipment.brand}</p></div>
                        <div className="view-info-label"><p>Manufacturer: </p><p>{equipment.manufacturer}</p></div>
                        <div className="view-info-label"><p>Price: </p><p>{equipment.price}</p></div>
                        <div className="view-info-label"><p>Expiration: </p><p>{equipment.expiration}</p></div>
                        <div className="view-info-label"><p>Purchase Date: </p><p>{equipment.purchaseDate}</p></div>
                    </div>
                </div>
            </div>
            <div className="container-details">
                <div className="details">
                    <div className="details-column-info">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/calibration.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Calibration Details</h2>
                        </div>
                        <div className="view-info-label"><p>Calibration Date: </p><p>{equipment.calibrationDate}</p></div>
                        <div className="view-info-label"><p>Next Calibration Date: </p><p>{equipment.nextCalibration}</p></div>
                        <div className="view-info-label"><p>Calibration Method: </p><p>{equipment.calibrationMethod}</p></div>
                        <div className="view-info-label">
                            <p>Certificate: </p>
                            <Button 
                            style={{ color: '#FFF', fontWeight:"bold"}}
                            startIcon={<SaveAltIcon />}
                            //onClick={returnToView}
                            >
                            Download
                            </Button>
                        </div>
                    </div>
                    <div className="details-column-info">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/others.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Other Details</h2>
                        </div>
                        <div className="view-info-label"><p>Issued By: </p><p>{equipment.issuedBy}</p></div>
                        <div className="view-info-label"><p>Issued To: </p><p>{equipment.issuedTo}</p></div>
                        <div className="view-info-label"><p>Location: </p><p>{equipment.location}</p></div>
                        <div className="view-info-label"><p>Status: </p><p>{equipment.status}</p></div>
                        <div className="view-info-label"><p>Remarks: </p><p>{equipment.remarks}</p></div>
                    </div>
                </div>
            </div>
            <div className="btn-add">
                <Button 
                variant="contained"
                style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold"}}
                startIcon={<KeyboardReturnIcon />}
                onClick={returnToView}
                >
                RETURN
                </Button>
            </div>
    </div>
    )
}

export default Equipment
