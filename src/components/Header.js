import {useContext} from 'react'
import { LoginContext } from '../App'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = () => {
    const {user, setUser} =  useContext(LoginContext)

    const logout = () => {
        setUser({
            username: "",
            password: ""
          })
    }

    return (
        <header className="header">
            <div className="container-title">
            <div className="img">
            <img className="logo" src="logo.png" width="50" height="50" alt="logo" margin="20px"/>
            </div>
            <h1 className='title'>Equipment Monitoring System</h1>
            </div>
            <div className="container-logout">
                <img className="logo" src="/img/user.png" width="40" height="40" alt="logo" margin="20px"/>
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