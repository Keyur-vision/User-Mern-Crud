import React, { Fragment, useContext, useEffect, useState } from 'react'
import signInImage from '../../assets/images/signInoimg.png';
import { Input } from '../../components/form/Input';
import "../../style/pages/SignIn.scss"
import { Button } from '../../components/button/Button';
import { loginUser } from '../../services/user';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../hooks/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [data, setData] = useState({ email: "", password: "" })
    const { token, setToken } = useContext(UserContext);

    const handleChange = (e) => {
        data[e.target.name] = e.target.value;
        setData({ ...data })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const items in data) {
            validateField(items);
        }

        if (Object.keys(error).length == 0) {
            try {
                const response = await loginUser(data);
                if (response?.status === true) {
                    localStorage.setItem('token', JSON.stringify(response.token));
                    // localStorage.setItem('isLogin', true);
                    // setIsLoggedIn(true);
                    setToken(response.token)
                    navigate("/");
                } else {
                    toast.error(response.response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const validateField = (name) => {
        switch (name) {
            case "email": {
                if (data.email == "") {
                    error.email = "Please enter your email address.";
                }
                else {
                    delete error.email;
                }
                break;
            }

            case "password": {
                if (data.password == "") {
                    error.password = "Please enter a password.";
                } else {
                    delete error.password;
                }
            }
        }
        setError({ ...error });
    }

    return (
        <Fragment>
            <div className="signIn" onSubmit={handleSubmit}>
                <div className="container">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {/* Same as */}
                    <ToastContainer />

                    <div className="signIn-data">
                        <div className="row">
                            <div className="col hidden signin-first-col">
                                <div className='h-100 '>
                                    <img src={signInImage} alt="" width="100%" height="100%" />
                                </div>
                            </div>
                            <div className="col">
                                <div className='w-100 signin-second-col'>
                                    <div>
                                        <h2>Sign In</h2>
                                    </div>
                                    <form action="">
                                        <Input type="email" placeholder="Email" name="email" label="Email" value={data.email} onChange={handleChange} />
                                        <span className='error-msg'>{error?.email}</span>
                                        <Input type="password" placeholder="password" name="password" label="Password" value={data.password} onChange={handleChange} />
                                        <span className='error-msg'>{error?.password}</span>

                                        <div className='d-flex align-center signin-remember'> <input type="checkbox" /> <label className='signin-remember-btn'> Remember Me </label></div>
                                        <div className="signin-btn">
                                            <Button type="submit" text="Sign In"></Button>
                                        </div>
                                    </form>
                                    <div className='d-flex alin-center auth-navigate-btn'>
                                        <p>Already have an account?</p> <NavLink to='/signUp'>Sign-up</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default SignIn