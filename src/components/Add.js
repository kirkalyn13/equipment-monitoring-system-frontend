import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import AddCircleIcon from "@material-ui/icons/AddCircle"

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

const Add = () => {
    const initialFieldValues = {
        eqpName: '',
        eqpType: '',
        eqpModel: '',
        eqpSerial: '',
        eqpDesc: '',
        eqpBrand: '',
        eqpPrice: '',
        eqpManufacturer: '',
        eqpExp: '',
        eqpPurchaseDate: '',
        eqpCalibDate: '',
        eqpNextCalib: '',
        eqpCalibMethod: '',
        eqpLoc : '',
        eqpIssuedBy: '',
        eqpIssuedTo: '',
        eqpRemarks: '',
        eqpStatus: 'Offline',
        eqpCertificate: null,
    }
    const [ values, setValues ] = useState(initialFieldValues)
    const [submitState, setSubmitState] = useState(false)

    const addEquipment = () => {
        axios.post('http://localhost:3005/create',{
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
          alert(`Added ${values.eqpName} (${values.eqpSerial}).`)
          setSubmitState(!submitState)
        })
      }

      /*const logChanges = () => {
        axios.post('http://localhost:3005/create/changelog',{
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
          alert(`Added ${values.eqpName} (${values.eqpSerial}).`)
          setSubmitState(!submitState)
        })
      }*/

      const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }
      const handleFormSubmit = e => {
        e.preventDefault()
        addEquipment()
        setSubmitState(!submitState)
        }

    const handleSelectChange = e => {
        setValues([...values, {eqpStatus: e.target.value}])
    }

      useEffect(()=>{
        setValues(initialFieldValues)
    },[submitState])

    return (
        <div className="container-add">
            <div className="section-head">
                <div className="section-title">
                    <img className="section-logo" src="/img/add.png" alt="" height="50px" width="50px" />
                    <h2 color="#FFFFFF">Add Equipment</h2>
                </div>
            </div>
            <form className="input-info" autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="container-details">
                <div className="detail-title">
                    <img className="section-logo" src="/img/info.png" alt="" height="50px" width="50px" />
                    <h2 color="#FFFFFF">General Information</h2>
                </div>
                    <div className="details">
                        <div className="details-column">
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
                        </div>
                        <div className="details-column">
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
                        </div>
                    </div>
                </div>
                <div className="container-details">
                <div className="detail-title">
                    <img className="section-logo" src="/img/purchase.png" alt="" height="50px" width="50px" />
                    <h2 color="#FFFFFF">Purchase Details</h2>
                </div>
                <div className="details">
                <div className="details-column">
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
                    </div>
                    <div className="details-column">
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
                <div className="detail-title">
                    <img className="section-logo" src="/img/calibration.png" alt="" height="50px" width="50px" />
                    <h2 color="#FFFFFF">Calibration Details</h2>
                </div>
                <div className="details">
                    <div className="details-column">
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
                    </div>
                    <div className="details-column">
                        <label>Calibration Method: </label>
                        <input type="text"
                        onChange={handleInputChange}
                        name="eqpCalibMethod" value={values.eqpCalibMethod}
                            placeholder="Method of Calibration"/>
                        <label>Certificate: </label>
                        <input type="file"
                        onChange={handleInputChange}
                        name="eqpCertificate" value={values.eqpCertificate}
                            placeholder="Latest Calibration Certificate"
                            style={{border:"inherit"}}/>
                    </div>
                </div>   
                </div>
                <div className="container-details">
                <div className="detail-title">
                    <img className="section-logo" src="/img/others.png" alt="" height="50px" width="50px" />
                    <h2 color="#FFFFFF">Other Details</h2>
                </div>
                    <div className="details">
                        <div className="details-column">
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
                        </div>
                        <div className="details-column">
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
                    startIcon={<AddCircleIcon />}
                    >
                    ADD EQUIPMENT
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Add
