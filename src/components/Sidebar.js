import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({role}) => {
    const editors = [ "admin", "super" ]
    return (
        <div className="container-nav">
            <nav>
                <Link to="/">
                    DASHBOARD
                </Link>
                <Link to="/view">
                    VIEW EQUIPMENT
                </Link>
                {editors.includes(role) ? (<Link to="/add">
                    ADD EQUIPMENT
                </Link>) : null}
                {editors.includes(role) ? (<Link to="/manage">
                    MANAGE EQUIPMENT
                </Link>) : null}
                {role === "super" ? (<Link to="/users">
                    MANAGE USERS
                </Link>) : null}
            </nav>
        </div>
    )
}

export default Sidebar
