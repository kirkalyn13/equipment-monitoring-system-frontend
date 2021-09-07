import { useState, useEffect } from 'react'
import Percentage from './Percentage'
import Pending from './Pending'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import moment from 'moment'


const Dashboard = ({dept}) => {
    const [pending, setPending] = useState([])
    const [total, setTotal] = useState([])
    const [alertTrigger, setAlertTrigger] = useState(false)
    const [ showAlert, setShowAlert] = useState(true)

    const getPending = () => {
        axios.get(`http://localhost:3005/allequipment`).then((response)=>{ 
            setTotal(response.data.length)
            const filtered = response.data.filter(val => {
                return -(moment().diff(val.nextCalibration, "days")) <= 30
            }
            )
            setPending([...filtered])
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
