import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="container-nav">
            <nav>
                <Link to="/">
                    DASHBOARD
                </Link>
                <Link to="/view">
                    VIEW EQUIPMENT
                </Link>
                <Link to="/add">
                    ADD EQUIPMENT
                </Link>
                <Link to="/manage">
                    MANAGE EQUIPMENT
                </Link>
                <Link to="/users">
                    MANAGE USERS
                </Link>
            </nav>
        </div>
    )
}

export default Sidebar
