import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { EditContext } from './Item'
import { ReloadContext } from '../routes/Manage'
import { SERVER } from '../App'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'


const statusOptions = [
    {
      label: "Online",
      value: "Online",
    },
    {
      label: "Offline",
      value: "Offline",
    },
    {
      label: "Obsolete",
      value: "Obsolete",
    },
    {
      label: "Decommissioned",
      value: "Decommissioned",
    },
  ]

const Edit = ({info}) => {
    const { setShowEdit } = useContext(EditContext)
    const {reload, setReload} = useContext(ReloadContext)

    const fieldValues = {
        eqpName: info.name,
        eqpType: info.type,
        eqpModel: info.model,
        eqpSerial: info.serial,
        eqpDesc: info.description,
        eqpBrand: info.brand,
        eqpPrice: info.price,
        eqpManufacturer: info.manufacturer,
        eqpExp: info.expiration,
        eqpPurchaseDate: info.purchaseDate,
        eqpCalibDate: info.calibrationDate,
        eqpNextCalib: info.nextCalibration,
        eqpCalibMethod: info.calibrationMethod,
        eqpLoc : info.location,
        eqpIssuedBy: info.issuedBy,
        eqpIssuedTo: info.issuedTo,
        eqpRemarks: info.remarks,
        eqpStatus: info.status, 
        eqpCertificate: info.certificate,
        eqpImage: info.image
    }
    const [ values, setValues ] = useState(fieldValues)
    const [submitState, setSubmitState] = useState(false)
    const [certificate, setCertificate] = useState(null)
    const [image, setImage] = useState(null)

    const editEquipment = () => {
        axios.put(`http://${SERVER}/edit/${info.id}`,{
          eqpName: values.eqpName,
          eqpType: values.eqpType,
          eqpModel: values.eqpModel,
          eqpSerial: values.eqpSerial,
          eqpDesc: values.eqpDesc,
          eqpBrand: values.eqpBrand,
          eqpPrice: values.eqpPrice,
          eqpManufacturer: values.eqpManufacturer,
          eqpExp: values.eqpExp,
          eqpPurchaseDate: values.eqpPurchaseDate,
          eqpCalibDate: values.eqpCalibDate,
          eqpNextCalib: values.eqpNextCalib,
          eqpCalibMethod: values.eqpCalibMethod,
          eqpLoc : values.eqpLoc,
          eqpIssuedBy: values.eqpIssuedBy,
          eqpIssuedTo: values.eqpIssuedTo,
          eqpRemarks: values.eqpRemarks,
          eqpStatus: values.eqpStatus,
          eqpCertificate: values.eqpCertificate,
          eqpImage: values.eqpImage
        }).then(()=>{
          alert(`Updated ${values.eqpName} (${values.eqpSerial}).`)
          //setSubmitState(!submitState)
        })
      }
    const logChanges = () =>{
        axios.post(`http://${SERVER}/changelog/${info.id}`,{
          eqpName: values.eqpName,
          eqpType: values.eqpType,
          eqpModel: values.eqpModel,
          eqpSerial: values.eqpSerial,
          eqpDesc: values.eqpDesc,
          eqpBrand: values.eqpBrand,
          eqpPrice: values.eqpPrice,
          eqpManufacturer: values.eqpManufacturer,
          eqpExp: values.eqpExp,
          eqpPurchaseDate: values.eqpPurchaseDate,
          eqpCalibDate: values.eqpCalibDate,
          eqpNextCalib: values.eqpNextCalib,
          eqpCalibMethod: values.eqpCalibMethod,
          eqpLoc : values.eqpLoc,
          eqpIssuedBy: values.eqpIssuedBy,
          eqpIssuedTo: values.eqpIssuedTo,
          eqpRemarks: values.eqpRemarks,
          eqpStatus: values.eqpStatus,
          eqpCertificate: values.eqpCertificate,
        }).then(()=>{
            console.log("Updated change logs.")
        })
    }
    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const onChangeFileHandler = e =>{
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function(){
            setValues({...values, eqpCertificate: reader.result})
        }
    }

    const onChangeImageHandler = e =>{
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function(){
            setValues({...values, eqpImage: reader.result})
        }
    }
    
    const handleFormSubmit = e => {
        e.preventDefault()
        logChanges()
        editEquipment()
        setSubmitState(!submitState)
        setShowEdit(false)
        setReload(!reload)
        }

    useEffect(()=>{
        setValues(fieldValues)
    },[submitState])

    return (
        <div className="container-edit">
            <div className="section-head">
                <div className="section-title">
                    <img className="section-logo" src="/img/edit.png" alt="" height="50px" width="50px" />
                    <h2 color="#FFFFFF">Edit Equipment Information</h2>
                </div>
            </div>
            <form className="input-info" autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="container-details">
                    <div className="details">
                        <div className="details-column">
                            <div className="detail-title">
                                <img className="section-logo" src="/img/info.png" alt="" height="50px" width="50px" />
                                <h2 color="#FFFFFF">General Information</h2>
                            </div>
                            <label>Name: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpName" value={values.eqpName}
                            required placeholder="Equipment Name"/>
                            <label>Type: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpType" value={values.eqpType}
                            required placeholder="Equipment Type"/>
                            <label>Model: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpModel" value={values.eqpModel}
                            required placeholder="Equipment Model"/>
                            <label>Serial: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpSerial" value={values.eqpSerial}
                            required placeholder="Equipment Serial"/>
                            <label>Description: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpDesc" value={values.eqpDesc}
                                placeholder="Equipment Description"/>
                            <label>Image: </label>
                            <input type="file"
                                onChange={onChangeImageHandler}
                                name="eqpImage" value={image}
                                accept="image/*"
                                placeholder="Equipment Image"
                                style={{border:"inherit"}}/>
                        </div>
                        <div className="details-column">
                            <div className="detail-title">
                                <img className="section-logo" src="/img/purchase.png" alt="" height="50px" width="50px" />
                                <h2 color="#FFFFFF">Purchase Details</h2>
                            </div>
                            <label>Brand: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpBrand" value={values.eqpBrand}
                                placeholder="Equipment Brand"/>
                            <label>Manufacturer: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpManufacturer" value={values.eqpManufacturer}
                                placeholder="Equipment Manuacturer"/>
                            <label>Price: </label>
                            <input type="number"
                            onChange={handleInputChange}
                            name="eqpPrice" value={values.eqpPrice}
                                placeholder="Equipment Price"/>
                                <label>Expiration: </label>
                            <input type="date"
                            onChange={handleInputChange}
                            name="eqpExp" value={values.eqpExp}
                                placeholder="Expiration/Warranty"/>
                            <label>Purchase Date: </label>
                            <input type="date"
                            onChange={handleInputChange}
                            name="eqpPurchaseDate" value={values.eqpPurchaseDate}
                                placeholder="Purchase Date"/>
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
                            <input type="date"
                            onChange={handleInputChange}
                            name="eqpCalibDate" value={values.eqpCalibDate}
                                placeholder="Calibraton Date"/>
                            <label>Next Calibration Date: </label>
                            <input type="date"
                            onChange={handleInputChange}
                            name="eqpNextCalib" value={values.eqpNextCalib}
                                placeholder="Next Calibration Date"/>
                            <label>Calibration Method: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpCalibMethod" value={values.eqpCalibMethod}
                                placeholder="Method of Calibration"/>
                            <label>Certificate: </label>
                            <input type="file"
                            onChange={onChangeFileHandler}
                            name="eqpCertificate" value={certificate}
                                placeholder="Latest Calibration Certificate"
                                accept="application/pdf"
                                style={{border:"inherit"}}/>
                        </div>
                        <div className="details-column">
                            <div className="detail-title">
                                <img className="section-logo" src="/img/others.png" alt="" height="50px" width="50px" />
                                <h2 color="#FFFFFF">Other Details</h2>
                            </div>
                            <label>Issued By: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpIssuedBy" value={values.eqpIssuedBy}
                                placeholder="Issued By"/>
                            <label>Issued To: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpIssuedTo" value={values.eqpIssuedTo}
                                placeholder="Issued To"/>
                                <label>Location: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpLoc" value={values.eqpLoc}
                                placeholder="Equipment Location"/>
                            <label>Status: </label>
                                <select name="eqpStatus" value={values.eqpStatus} onChange={e => setValues({...values, eqpStatus: e.target.value})}>
                                {statusOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>   
                            <label>Remarks: </label>
                            <input type="text"
                            onChange={handleInputChange}
                            name="eqpRemarks" value={values.eqpRemarks}
                                placeholder="Remarks/Other Details"/>
                        </div>
                    </div>
                </div>
                <div className="btn-add">
                    <Button
                    type="submit" 
                    variant="contained"
                    style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold"}}
                    startIcon={<EditIcon />}
                    >
                    UPDATE EQUIPMENT INFO
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Edit
