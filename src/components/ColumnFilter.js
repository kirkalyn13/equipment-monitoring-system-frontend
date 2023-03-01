import React, { useContext } from 'react'

import { EquipmentContext } from '../routes/View'

const ColumnFilter = () => {
    const { showAll, setShowAll, shown, setShown } = useContext(EquipmentContext)
    
    const handleShowAll = () => {
        setShowAll(!showAll)
    }

    const handleShowName = () => {
        setShown({...shown, showName: !shown.showName})
    }

    const handleShowType = () => {
        setShown({...shown, showType: !shown.showType})
    }

    const handleShowModel = () => {
        setShown({...shown, showModel: !shown.showModel})
    }

    const handleShowSerial = () => {
        setShown({...shown, showSerial: !shown.showSerial})
    }

    const handleShowDescription = () => {
        setShown({...shown, showDescription: !shown.showDescription})
    }


    const handleShowBrand = () => {
        setShown({...shown, showBrand: !shown.showBrand})
    }

    const handleShowPrice = () => {
        setShown({...shown, showPrice: !shown.showPrice})
    }

    const handleShowManufacturer = () => {
        setShown({...shown, showManufacturer: !shown.showManufacturer})
    }

    const handleShowExpiration = () => {
        setShown({...shown, showExpiration: !shown.showExpiration})
    }

    const handleShowPurchaseDate = () => {
        setShown({...shown, showPurchaseDate: !shown.showPurchaseDate})
    }

    const handleShowCalibrationDate = () => {
        setShown({...shown, showCalibrationDate: !shown.showCalibrationDate})
    }

    const handleShowNextCalibration = () => {
        setShown({...shown, showNextCalibration: !shown.showNextCalibration})
    }

    const handleShowCalibrationMethod = () => {
        setShown({...shown, showCalibrationMethod: !shown.showCalibrationMethod})
    }

    const handleShowForMaintenance = () => {
        setShown({...shown, showForMaintenance: !shown.showForMaintenance})
    }

    const handleShowLocation = () => {
        setShown({...shown, showLocation: !shown.showLocation})
    }

    const handleShowIssuedBy = () => {
        setShown({...shown, showIssuedBy: !shown.showIssuedBy})
    }

    const handleShowIssuedTo = () => {
        setShown({...shown, showIssuedTo: !shown.showIssuedTo})
    }

    const handleShowRemarks = () => {
        setShown({...shown, showRemarks: !shown.showRemarks})
    }

    const handleShowStatus = () => {
        setShown({...shown, showStatus: !shown.showStatus})
    }

    const handleShowCertificate = () => {
        setShown({...shown, showCertificate: !shown.showCertificate})
    }

    return (
        <form className="container-checkbox">
            <div className="checkbox-column">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={showAll}
                        style={{fontWeight: 'bold'}}
                        onChange={handleShowAll}
                    />
                    SELECT ALL
                </label>
                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={shown.showName}
                    onChange={handleShowName}
                    />
                    Name
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showType}
                        onChange={handleShowType}
                    />
                    Type
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showModel}
                        onChange={handleShowModel}
                    />
                    Model
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showSerial}
                        onChange={handleShowSerial}
                    />
                    Serial
                    </label>
            </div>
            <div className="checkbox-column">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showDescription}
                        onChange={handleShowDescription}
                    />
                    Description
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showBrand}
                        onChange={handleShowBrand}
                    />
                    Brand
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showPrice}
                        onChange={handleShowPrice}
                    />
                    Price
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showManufacturer}
                        onChange={handleShowManufacturer}
                    />
                    Manufacturer
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showExpiration}
                        onChange={handleShowExpiration}
                    />
                    Expiration
                    </label>
            </div>
            <div className="checkbox-column">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showPurchaseDate}
                        onChange={handleShowPurchaseDate}
                    />
                    Purchase Date
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showCalibrationDate}
                        onChange={handleShowCalibrationDate}
                    />
                    Calibration Date
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showNextCalibration}
                        onChange={handleShowNextCalibration}
                    />
                    Next Calibration
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showCalibrationMethod}
                        onChange={handleShowCalibrationMethod}
                    />
                    Calibration Method
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showForMaintenance}
                        onChange={handleShowForMaintenance}
                    />
                    For Maintenance
                    </label>
            </div>
            <div className="checkbox-column">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showLocation}
                        onChange={handleShowLocation}
                    />
                    Location
                    </label>
                <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={shown.showIssuedBy}
                    onChange={handleShowIssuedBy}
                />
                    Issued By
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showIssuedTo}
                        onChange={handleShowIssuedTo}
                    />
                    Issued To
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showStatus}
                        onChange={handleShowStatus}
                    />
                    Status
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showRemarks}
                        onChange={handleShowRemarks}
                    />
                    Remarks
                    </label>
            </div>
            <div className="checkbox-column">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showCertificate}
                        onChange={handleShowCertificate}
                    />
                    Certificate
                    </label>
            </div>         
        </form>
    )
}

export default ColumnFilter
