import React from 'react'
import { useContext } from 'react'
import Select from 'react-select'
import { EquipmentContext } from './View'

const columnOptions = [
    {value:'name', label:"Name"},
    {value:'type', label:"Type"},
    {value:'model', label:"Model"},
    {value:'serial', label:"Serial"},
    {value:'description', label:"Description"},
    {value:'brand', label:"Brand"},
    {value:'price', label:"Price"},
    {value:'manufacturer', label:"Manufacturer"},
    {value:'expiration', label:"Expiration"},
    {value:'purchaseDate', label:"Purchase Date"},
    {value:'calibrationDate', label:"Last Calibration"},
    {value:'nextCalibration', label:"Next Calibration"},
    {value:'calibrationMethod', label:"Calibration Method"},
    {value:'location', label:"Location"},
    {value:'issuedBy', label:"Issued By"},
    {value:'issuedTo', label:"Issued To"},
    {value:'remarks', label:"Remarks"},
]

const Filter = () => {
    const { setSelected } = useContext(EquipmentContext)
    return (
        <>
            <Select
            defaultValue={[columnOptions[0], columnOptions[3], columnOptions[4]]}
            color="black"
            isMulti
            name="columns"
            options={columnOptions}
            onChange={event => setSelected(event.map(val => val.value))}
        />
        </>
    )
}

export default Filter
