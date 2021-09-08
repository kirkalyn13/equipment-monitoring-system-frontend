import React, { useEffect, useContext } from 'react'

import { EquipmentContext } from './View'

const Filter = () => {
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

    const handleShowDesc = () => {
        setShown({...shown, showDesc: !shown.showDesc})
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

    const handleShowExp = () => {
        setShown({...shown, showExp: !shown.showExp})
    }

    const handleShowPurchaseDate = () => {
        setShown({...shown, showPurchaseDate: !shown.showPurchaseDate})
    }

    const handleShowCalibDate = () => {
        setShown({...shown, showCalibDate: !shown.showCalibDate})
    }

    const handleShowNextCalib = () => {
        setShown({...shown, showNextCalib: !shown.showNextCalib})
    }

    const handleShowCalibMethod = () => {
        setShown({...shown, showCalibMethod: !shown.showCalibMethod})
    }

    const handleShowLoc = () => {
        setShown({...shown, showLoc: !shown.showLoc})
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
            </div>
            <div className="checkbox-column">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showSerial}
                        onChange={handleShowSerial}
                    />
                    Serial
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showDesc}
                        onChange={handleShowDesc}
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
            </div>
            <div className="checkbox-column">
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
                        checked={shown.showExp}
                        onChange={handleShowExp}
                    />
                    Expiration
                    </label>
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
                        checked={shown.showCalibDate}
                        onChange={handleShowCalibDate}
                    />
                    Calibration Date
                    </label>
            </div>
            <div className="checkbox-column">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showNextCalib}
                        onChange={handleShowNextCalib}
                    />
                    Next Calibration
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showCalibMethod}
                        onChange={handleShowCalibMethod}
                    />
                    Calibration Method
                    </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={shown.showLoc}
                        onChange={handleShowLoc}
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
            </div>
            <div className="checkbox-column">
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

export default Filter
