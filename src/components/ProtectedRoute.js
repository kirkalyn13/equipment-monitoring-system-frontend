import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({userRole, allowedRoles, isAuth: isAuth, component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if(isAuth && allowedRoles.includes(userRole)){
                return <Component />
            }else{
                <Redirect to={{pathname: "/", state: {from: props.location}}} />
            }
            }}/>
    )
}

export default ProtectedRoute
