import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Input } from '../../components/form/Input'
import { useNavigate, useParams } from 'react-router-dom';
import profileImg from "../../assets/images/profile.png"
import { Button } from '../../components/button/Button';
import "../../style/pages/userForm.scss"
import { editUser, getUser } from '../../services/user';

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        profile: "",
        mobile_no: "",
        age: "",
        password: "",
        dob: ""
    })
    const [showError, setShowError] = useState({})
    const [allUser, setAllUser] = useState([])
    // const [user, setuser] = useState();

    const getUserFun = async () => {
        try {
            const findAllUser = await getUser();
            setAllUser([...findAllUser.data])
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        getUserFun();
    }, [])


    useEffect(() => {
        const findUser = allUser.find((item) => item._id === id)
        setUser({ ...findUser, dob: findUser?.dob.split('T')[0] })
    }, [id, allUser])


    const handleChange = (e) => {

        if (e.target.files) {
            setUser({
                ...user, [e.target.name]: e.target.files[0],
            });
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        for (const data in user) {
            validateField(data);
        }

        for (const key in user) {
            formData.append(key, user[key]);
        }
        if (Object.keys(showError).length === 0) {
            try {
                const user = await editUser(id, formData);
                if (user?.status) {
                    navigate("/");
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const validateField = (name) => {
        switch (name) {
            case "firstName": {
                if (user.firstName == "") {
                    showError.firstName = "Please enter your first name.";
                } else {
                    delete showError.firstName
                }
                break;
            }

            case "lastName": {
                if (user.lastName == "") {
                    showError.lastName = "Please enter your last name.";
                } else {
                    delete showError.lastName
                }
                break;
            }

            case "email": {
                if (user.email == "") {
                    showError.email = "Please enter your email address.";
                } else if (
                    !new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(
                        user.email
                    )
                ) {
                    showError.email = "Please enter a valid email address.";
                } else {
                    delete showError.email;
                }
                break;
            }

            case "mobile_no": {
                if (user.mobile_no == "") {
                    showError.mobile_no = "Please enter your phone number";
                }
                else if (!new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(user.mobile_no)) {
                    showError.mobile_no = "Please enter a valid phone number.";
                } else {
                    delete showError.mobile_no;
                }
                break;
            }

            case "userName": {
                if (user.userName == "") {
                    showError.userName = "Please enter your user name";
                } else {
                    delete showError.userName;
                }
                break;
            }

            case "age": {
                if (user.age == "") {
                    showError.age = "Enter your age";
                } else {
                    delete showError.age;
                }
                break;
            }


            case "password": {
                if (user.password == "") {
                    showError.password = "please select a password";
                }
                else if (!new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(user.password)) {
                    showError.password = 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.';
                }
                else {
                    delete showError.password;
                }
                break;
            }

            case "dob": {
                if (user.dob == "") {
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
        <div className="userFrom">
            <div className="container">
                <div className="form-center">
                    <div className="form-hieght">
                        <div className='w-100 signup-col-two'>
                            <form action="" className='signup-form' onSubmit={handleSubmit}>
                                {/* <div className="user-profile">
                                    <label for="actual-btn" className='d-flex align-center main-profile'><img src={profileImg} className='profile-img' /> <label htmlFor="">  Profile </label> </label>
                                    <input type="file" name="profile" id="actual-btn" onChange={handleChange} />
                                </div> */}
                                <div className='Edit-heading'>
                                    <h2>Edit user</h2>
                                </div>
                                <div className="row form-row">
                                    <div className="col form-col">
                                        <Input type="text" name="firstName" placeholder="First name" value={user.firstName} onChange={handleChange} label="First Name" />
                                        <span className='error-msg'>{showError.firstName}</span>

                                    </div>
                                    <div className="col form-col">
                                        <Input type="text" name="lastName" placeholder="Last name" value={user.lastName} onChange={handleChange} label="Last Name" />
                                        <span className='error-msg'>{showError.lastName}</span>

                                    </div>
                                    <div className="col form-col">
                                        <Input type="text" name="userName" placeholder="UserName" value={user.userName} onChange={handleChange} label="UserName" />
                                        <span className='error-msg'>{showError.userName}</span>

                                    </div>
                                    <div className="col form-col">
                                        <Input type="number" name="mobile_no" onChange={handleChange} value={user?.mobile_no} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Mobile number" label="Mobile Number" />
                                        <span className='error-msg'>{showError.mobile_no}</span>

                                    </div>
                                    <div className="col form-col form-email-col">
                                        <Input type="email" name="email" onChange={handleChange} value={user.email} placeholder="Email" label="Email" />
                                        <span className='error-msg'>{showError.email}</span>

                                    </div>
                                    <div className="col form-col">
                                        <Input type="date" name="dob" onChange={handleChange} value={user?.dob} placeholder="Date of birth" label="Date of Birth" />
                                        <span className='error-msg'>{showError.dob}</span>

                                    </div>
                                    <div className="col form-col form-age-col">
                                        <Input type="number" name="age" onChange={handleChange} value={user.age} placeholder="age" label="age" />
                                        <span className='error-msg'>{showError.age}</span>

                                    </div>

                                    <div className='profile-img'>
                                        <label htmlFor="">Profile</label>
                                        <input type="file" name="profile" id="actual-btn" onChange={handleChange} />
                                    </div>

                                </div>
                                <div className="signup-btn">
                                    <Button type="submit" className="user-edit-btn" text="Edit  User" ></Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm