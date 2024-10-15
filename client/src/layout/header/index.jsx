import React, { Fragment, useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "../../style/layout/header.scss";
import { UserContext } from '../../hooks/context';
import { jwtDecode } from "jwt-decode"

function HeaderComponent() {
    const navigate = useNavigate();
    const { setToken } = useContext(UserContext);
    const token = localStorage.getItem('token');

    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Token is invalid", error);
            return null;
        }
    };

    const isTokenExpired = (token) => {
        if (!token) return true;
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) return true;
        return decoded.exp * 1000 < Date.now(); // Compare expiration time
    };

    useEffect(() => {
        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem("token");
                setToken(localStorage.removeItem("token"))
                navigate('/signIn')
                console.log("Token Expired....")
            } else {
                const decoded = decodeToken(token);
                console.log(decoded)
            }
        } else {
            setToken(false);
        }
    }, [token]);


    const logoutData = () => {
        setToken(localStorage.removeItem("token"));
        localStorage.setItem("isLogin", false);
        localStorage.removeItem("token");
    }

    return (
        <Fragment>
            <div className="header">
                <div className="header-text">
                    <div className="container">
                        <div className="header-menu">
                            <ul className='d-flex '>
                                <li> <NavLink to="/">Home</NavLink></li>
                                <li>  <NavLink to="lastLogin">Last Login Users</NavLink></li>
                                <li className='logout-btn'> <NavLink to="/" onClick={logoutData} >Logout</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default HeaderComponent