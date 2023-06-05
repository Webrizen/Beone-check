import React from 'react';
import { Navigate } from 'react-router-dom';
const RouteGuard = () => {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
        // console.log("not logined");
    }
}
export default RouteGuard;