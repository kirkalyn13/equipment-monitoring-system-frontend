import {useContext} from 'react'
import { LoginContext } from '../App'
import Button from '@mui/material/Button'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const Header = ({school}) => {
    const {user, setUser, setIsAuth} =  useContext(LoginContext)

    const logout = () => {
        setUser({
          })
        setIsAuth(false)
        localStorage.removeItem("ems-user")
    }

    return (
        <header className="header">
            <div className="container-title">
            <div className="img">
            <img className="logo" src="logo.png" width="80" height="80" alt="logo" margin="10px"/>
            </div>
            <div className="title">
                <h3 className="title-text-head">{school}</h3>
                <h4 className="title-text">Equipment Monitoring System</h4>
            </div>
            </div>
            <div className="container-logout">
                <img className="logo" src="/img/user.png" width="50" height="50" alt="logo" margin="20px"/>
                <h3 className="username"> {user.username} </h3>
                <Button
                    onClick={logout} 
                    variant="contained"
                    style={{backgroundColor: '#FFA000', color: '#000', fontWeight:"bold", margin:"10px 5px 10px 10px"}}
                    startIcon={<ExitToAppIcon />}
                    >
                    Log Out
                    </Button>
            </div>
        </header>
    )
}

export default Header