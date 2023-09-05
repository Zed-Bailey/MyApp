import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from 'helpers';
import { Nav, PrivateRoute } from 'components';
import { Home } from 'pages/home/Home';
import { Login } from 'pages/login/Login';
import { Admin } from 'pages/admin/Admin';
import { Landing } from 'pages/landing/Landing';
import { Unauthorized } from 'pages/unauthorized/UnAuthorized';
import { Signup } from 'pages/signup/Signup';
import { NextUIProvider } from '@nextui-org/react';



export function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div>
            <NextUIProvider>
                <Nav />
                <div className="container mx-auto">
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route
                            path="/home"
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                // will only allow users with the admin role to access the route, this is also confirmed server side
                                <PrivateRoute roles="ADMIN">
                                    <Admin />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                    </Routes>
                </div>
            </NextUIProvider>

        </div>
    );
}
