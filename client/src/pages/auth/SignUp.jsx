import React, { Fragment, useState } from 'react'
import signupImage from '../../assets/images/signUp.png';
import { Input } from '../../components/form/Input';
import "../../style/pages/SignUp.scss"
import { Button } from '../../components/button/Button';
// import profileImg from "../../assets/images/profile.png"
import { NavLink, useNavigate } from 'react-router-dom';
import { addUser } from '../../services/user';
import axios from 'axios';
function SignUp() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        profile: "",
        mobile_no: "",
        age: "",
        password: "",
        dob: ""
    });

    const [showError, setShowError] = useState({})

    const handleChange = (e) => {

        if (e.target.files) {
            setUserData({
                ...userData,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const data in userData) {
            validateField(data);
        }

        if (Object.keys(showError).length === 0) {
            const formData = new FormData();

            for (const key in userData) {
                formData.append(key, userData[key]);
            }
            try {
                const response = await axios.post("http://localhost:8080/api/user/create", formData);
                if (response?.status) {
                    navigate("/signIn");
                }
            } catch (error) {
                console.log(error.response.data.message === 'E11000 duplicate key error collection: allUsers.users index: userName_1 dup key: { userName: "tudopuj" }')
                if (error.response.data.message === 'E11000 duplicate key error collection: allUsers.users index: userName_1 dup key: { userName: "tudopuj" }') {
                    alert("User name already exist");
                } else if (error.response.data.message === 'E11000 duplicate key error collection: allUsers.users index: email_1 dup key: { email: "barit@mailinator.com" }') {
                    alert("Email already exist");
                }
                else {
                    alert(error.response.data.message);
                }

            }
        }
    }

    const validateField = (name) => {
        switch (name) {
            case "firstName": {
                if (userData.firstName == "") {
                    showError.firstName = "Please enter your first name.";
                } else {
                    delete showError.firstName
                }
                break;
            }

            case "lastName": {
                if (userData.lastName == "") {
                    showError.lastName = "Please enter your last name.";
                } else {
                    delete showError.lastName
                }
                break;
            }

            case "email": {
                if (userData.email == "") {
                    showError.email = "Please enter your email address.";
                } else if (
                    !new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(
                        userData.email
                    )
                ) {
                    showError.email = "Please enter a valid email address.";
                } else {
                    delete showError.email;
                }
                break;
            }

            case "mobile_no": {
                if (userData.mobile_no == "") {
                    showError.mobile_no = "Please enter your phone number";
                }
                else if (!new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(userData.mobile_no)) {
                    showError.mobile_no = "Please enter a valid phone number.";
                } else {
                    delete showError.mobile_no;
                }
                break;
            }

            case "userName": {
                if (userData.userName == "") {
                    showError.userName = "Please enter your user name";
                } else {
                    delete showError.userName;
                }
                break;
            }

            case "age": {
                if (userData.age == "") {
                    showError.age = "Enter your age";
                } else {
                    delete showError.age;
                }
                break;
            }

            case "password": {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (userData.password == "") {
                    showError.password = "please select a password";
                } else if (!passwordRegex.test(userData.password)) {
                    showError.password = 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.';
                } else {
                    delete showError.password
                }
                break;
            }

            case "dob": {
                if (userData.dob == "") {
                    showError.dob = "please select a date of birth";
                } else {
                    delete showError.dob
                }
                break;
            }
        }
        setShowError({ ...showError });
    };

    return (
        <Fragment>
            <div className="signup">
                <div className="container">
                    <div className="signup-data">
                        <div className="row">
                            <div className="col col-one">
                                <div className='h-100'>
                                    <div className='signup-heading'>
                                        <h2>Signup</h2>
                                    </div>
                                    <img src={signupImage} alt="" width="100%" height="80%" />
                                </div>
                            </div>
                            <div className="col">
                                <div className='w-100 signup-col-two'>
                                    <form action="" className='signup-form' onSubmit={handleSubmit}>
                                        {/* <div className="user-profile">
                                            <label for="actual-btn" className='d-flex align-center main-profile'><img src={userData.profile ? userData.profile : profileImg} className='profile-img' /> <label htmlFor="">  Profile </label> </label>
                                            <input type="file" name="profile" id="actual-btn" onChange={handleChange} />
                                        </div> */}
                                        <div className="row form-row">
                                            <div className="col form-col">
                                                <Input type="text" name="firstName" placeholder="First name" onChange={handleChange} label="First Name" />
                                                <span className='error-msg'>{showError.firstName}</span>
                                            </div>
                                            <div className="col form-col">
                                                <Input type="text" name="lastName" placeholder="Last name" onChange={handleChange} label="Last Name" />
                                                <span className='error-msg'>{showError.lastName}</span>
                                            </div>
                                            <div className="col form-col">
                                                <Input type="text" name="userName" placeholder="UserName" onChange={handleChange} label="UserName" />
                                                <span className='error-msg'>{showError.userName}</span>
                                            </div>
                                            <div className="col form-col signUp-mobile">
                                                <Input type="number" name="mobile_no" onChange={handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Mobile number" label="Mobile Number" />
                                                <span className='error-msg'>{showError.mobile_no}</span>
                                            </div>
                                            <div className="col form-col form-email-col">
                                                <Input type="email" name="email" onChange={handleChange} placeholder="Email" label="Email" />
                                                <span className='error-msg'>{showError.email}</span>
                                            </div>
                                            <div className="col form-col form-age-col">
                                                <Input type="number" name="age" onChange={handleChange} placeholder="age" label="age" />
                                                <span className='error-msg'>{showError.age}</span>
                                            </div>
                                            <div className="col form-col">
                                                <Input type="password" name="password" onChange={handleChange} placeholder="password" label="Password" />
                                                <span className='error-msg'>{showError.password}</span>
                                            </div>

                                            <div className="col form-col">
                                                <Input type="date" name="dob" onChange={handleChange} placeholder="Date of birth" label="Date of Birth" />
                                                <span className='error-msg'>{showError.dob}</span>
                                            </div>
                                            <div className='profile-img'>
                                                <label htmlFor="">Profile</label>
                                                <input type="file" name="profile" id="actual-btn" onChange={handleChange} />
                                            </div>

                                        </div>
                                        <div className="signup-btn">
                                            <Button type="submit" text="Sign Up" ></Button>
                                        </div>
                                    </form>
                                    <div className='d-flex alin-center auth-navigate-btn'>
                                        <p>Already have an account?</p> <NavLink to='signIn'>Sign-In</NavLink>
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

export default SignUp