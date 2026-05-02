import { useState, useEffect } from 'react'
import { SERVER } from '../App'
import axios from 'axios'
import Button from '@mui/material/Button'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import Image from '../components/Image'
import { useHistory, useParams } from "react-router-dom"
import Switch from '@mui/material/Switch'
import { b64toBlob, getDateFromTimestamp } from '../util/util'

const Equipment = () => {
    const { id } = useParams()
    let history = useHistory()

    const [ equipment, setEquipment ] = useState({})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getEquipData = () => {
        axios.get(`${SERVER}/equipment/${id}`).then((response)=>{
        setEquipment(response.data[0])
        })
    }

    const downloadCertificate = (id) => {
        axios.get(`${SERVER}/equipment/${id}/certificate`)
        .then((response) => {   
            let pdfData = response.data[0].certificate.substring("data:application/pdf;base64,".length)
            let pdfBlob = b64toBlob(pdfData.replace('data:application/pdf;base64,', ''), 'application/pdf')
            let pdfUrl = URL.createObjectURL(pdfBlob)
            window.open(pdfUrl)
        })
        .catch((error) => console.error(error))
    }

    const returnToView = () => {
        history.push("/view")
    }

    useEffect(()=>{
        getEquipData()
    },[])

    const renderNeedMaintenance = () => {
        return (
            <div>
                <label>Need Maintenance : </label>
                <Switch 
                    checked={equipment.formaintenance === "Yes" ? true : false}
                    color="warning"
                    disabled
                    />
            </div>
        )
    }

    return (
        <div className="container-equipment-info">
        <div className="section-head">
            <div className="section-title">
                <img className="section-logo" src="/img/information.png" alt="" height="50px" width="50px" />
                <h2 color="#FFFFFF">Equipment Information</h2>
            </div>
            <Button
                onClick={returnToView}
                variant="contained"
                style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px"}}
                startIcon={<KeyboardReturnIcon />}
                >
                RETURN
            </Button>
        </div>
            <div className="container-details">
                <Image name={equipment.name} image={equipment.image}/>
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
                        <div className="view-info-label"><p>Expiration: </p><p>{getDateFromTimestamp(equipment.expiration)}</p></div>
                        <div className="view-info-label"><p>Purchase Date: </p><p>{getDateFromTimestamp(equipment.purchasedate)}</p></div>
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
                        <div className="view-info-label"><p>Calibration Date: </p><p>{getDateFromTimestamp(equipment.calibrationdate)}</p></div>
                        <div className="view-info-label"><p>Next Calibration Date: </p><p>{getDateFromTimestamp(equipment.nextcalibration)}</p></div>
                        <div className="view-info-label"><p>Calibration Method: </p><p>{equipment.calibrationmethod}</p></div>
                        <div className="view-info-label">
                            <p>Certificate: </p>
                            {equipment.certificate !== null ? 
                            (<Button 
                            style={{ color: '#FFF', fontWeight:"bold"}}
                            startIcon={<SaveAltIcon />}
                            onClick={() => downloadCertificate(id)}
                            >
                            Download
                            </Button>) : null}
                        </div>
                    </div>
                    <div className="details-column-info">
                        <div className="detail-title">
                            <img className="section-logo" src="/img/others.png" alt="" height="50px" width="50px" />
                            <h2 color="#FFFFFF">Other Details</h2>
                        </div>
                            {renderNeedMaintenance()}
                        <div className="view-info-label"><p>Issued By: </p><p>{equipment.issuedby}</p></div>
                        <div className="view-info-label"><p>Issued To: </p><p>{equipment.issuedto}</p></div>
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
