import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({userRole, allowedRoles, isAuth, component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if (!isAuth) return <Redirect to="/" />
            if (!allowedRoles.includes(userRole)) return <Redirect to="/unauthorized" />
            return <Component />
        }}/>
    )
}

export default ProtectedRoute
