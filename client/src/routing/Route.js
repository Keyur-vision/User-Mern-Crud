import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import { UserContext } from '../hooks/context';
import UserTable from '../pages/user/UserTable';
import UserForm from '../pages/user/UserForm';
import HeaderComponent from '../layout/header';
import LastLoginUsers from '../pages/user/LastLoginUsers';

function Routing() {
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLogin")) || false);
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    // utils/decodeToken.js

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])



    return (
        <Fragment>
            <BrowserRouter>
                <UserContext.Provider value={{ token, setToken }}>
                    <Routes>
                        {
                            token ? <>
                                <Route path='/' element={<HeaderComponent />} >
                                    <Route path='' element={<UserTable />} />
                                    <Route path='lastLogin' element={<LastLoginUsers />} />
                                    <Route path='userForm/:id' element={<UserForm />} />
                                    <Route path='*' element={<UserTable />} />
                                </Route>
                            </>
                                :
                                <>
                                    <Route path='/signUp' element={<SignUp />} />
                                    <Route path='/signIn' element={<SignIn />} />
                                    <Route path='*' element={<SignIn />} />
                                </>
                        }
                    </Routes>
                    <Navigate path={isLoggedIn == true ? "/" : "/signIn"}></Navigate>
                </UserContext.Provider>
            </BrowserRouter>
        </Fragment>
    )
}

export default Routing