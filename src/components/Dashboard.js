import { useState, useEffect } from 'react'
import Percentage from './Percentage'
import Pending from './Pending'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'


const Dashboard = ({dept}) => {
    const [pending, setPending] = useState([])
    const [total, setTotal] = useState([])
    const [alertTrigger, setAlertTrigger] = useState(false)
    const [ showAlert, setShowAlert] = useState(true)

    const parseYear = dtnow => {
        var d = new Date(dtnow);
        var y = d.getFullYear()
        return y
    }

    const parseMonth = dtnow => {
        var d = new Date(dtnow)
        var m = d.getMonth() + 1
        return m
    }
    const parseDay = dtnow => {
        var d = new Date(dtnow)
        var n = d.getDate()
        return n
    }

    /*const alertPending = () => {
        setTimeout(()=>{
            alert(`You have ${pending.length} Pending Calibrations.`)
          },1000)
    }*/

    const getPending = () => {
        axios.get(`http://localhost:3005/allequipment`).then((response)=>{
            var today = new Date()
            var ytoday = today.getFullYear()
            var mtoday = today.getMonth() + 1
            var ntoday = today.getDate()
            setTotal(response.data.length)
            const filteredYear = response.data.filter(val => {
                return parseYear(val.nextCalibration) <= ytoday
            }
            )
            const filteredPastMonths = filteredYear.filter(val => {
                return parseMonth(val.nextCalibration) < mtoday
            })

            const thisMonth = filteredYear.filter(val => {
                return parseMonth(val.nextCalibration) === mtoday
            })
            const filteredThisMonth = thisMonth.filter(val => {
                return parseDay(val.nextCalibration) <= ntoday
            })
            setPending([...filteredPastMonths, ...filteredThisMonth])
            setAlertTrigger(!alertTrigger)
        })
    }
    
    const closeAlert = () => {
        setShowAlert(false)
    }

    useEffect(()=>{
        setTimeout(()=>{
          getPending()
        },200)
      },[])

    /*useEffect(()=>{
        if(pending.length > 0){
            alertPending()
        }
    },[alertTrigger])*/

    return (
        <div className="container-dashboard">
            <h1 className="dashboard-title">{dept} Equipment Dashboard</h1>
            {showAlert === true ? <Alert
                severity="warning"
                variant="filled"
                style={{ color:'#000',fontWeight:'bold', fontSize:"large", margin:"2px 20px"}}
                    action={
                    <Button 
                    onClick={closeAlert}
                    style={{fontWeight:'bold'}}
                    color="inherit" size="large">
                        OKAY
                    </Button>
                    }
                >You have {pending.length} Pending Calibrations.
                </Alert> : null}
            <div className="container-metrics">
                <Percentage done={total-pending.length} pending={pending.length}/>
                <Pending pending={pending} />
            </div>
        </div>
    )
}

export default Dashboard
