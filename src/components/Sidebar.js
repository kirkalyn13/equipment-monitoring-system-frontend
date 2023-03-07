import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({role}) => {
    const editors = [ "admin", "super" ]
    const [active, setActive ] = useState("all")
    const location = useLocation()

    // Handle active from current location
    useEffect(() => {
        setActive(location.pathname)
    },[location])

    return (
        <div className="container-nav">
            <nav>
                <Link to="/"
                className={active === "/" ? 'nav-active' : ``}>
                    DASHBOARD
                </Link>
                <Link to="/view"
                className={active === "/view" ? 'nav-active' : ``}>
                    VIEW EQUIPMENT
                </Link>
                {editors.includes(role) ? (<Link to="/add"
                className={active === "/add" ? 'nav-active' : ``}>
                    ADD EQUIPMENT
                </Link>) : null}
                {editors.includes(role) ? (<Link to="/manage"
                className={active === "/manage" ? 'nav-active' : ``}>
                    MANAGE EQUIPMENT
                </Link>) : null}
                {role === "super" ? (<Link to="/users"
                className={active === "/users" ? 'nav-active' : ``}>
                    MANAGE USERS
                </Link>) : null}
            </nav>
        </div>
    )
}

export default Sidebar
