import { useState, useEffect } from 'react'
import { SERVER } from '../App'
import Percentage from '../components/Percentage'
import Pending from '../components/Pending'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

const Dashboard = ({dept}) => {
    const [pending, setPending] = useState([])
    const [total, setTotal] = useState([])
    const [alertTrigger, setAlertTrigger] = useState(false)
    const [ showAlert, setShowAlert] = useState(true)

    const getPending = () => {
        axios.get(`http://${SERVER}/allequipment`).then((response)=>{ 
            setTotal(response.data.length)
            const pendingFiltered = response.data.filter(val => val.status === "For Calibration")
            setPending([...pendingFiltered])
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
            {showAlert === true && pending.length > 0 ? <Alert
                severity="error"
                variant="filled"
                style={{ color:'#FFF',fontWeight:'bold', fontSize:"large", margin:"2px 20px"}}
                    action={
                    <Button 
                    onClick={closeAlert}
                    style={{fontWeight:'bold'}}
                    color="inherit" size="large">
                        CLOSE
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
