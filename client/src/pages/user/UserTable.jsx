import React, { Fragment, useEffect, useState } from 'react'
import { deleteUser, getUser } from '../../services/user';
import "../../style/pages/userTable.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function UserTable() {
    const [users, setUsers] = useState([])
    const [token, settoken] = useState(localStorage.getItem("token") || "")

    const newData = async () => {
        try {
            const getUsers = await getUser(token);
            setUsers([...getUsers.data])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        newData();
        settoken(localStorage.getItem("token"));
    }, [])

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure want to delete !") == true) {
                await deleteUser(id);
                newData();
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className="list-user">
                <div className="container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Mobile</th>
                                <th>DOB</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                < tr key={index} >
                                    <td><img src={`http://localhost:8080/img/upload/${user.profile}`} alt={`${user.firstName}`} className="profile-image" /></td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.mobile_no}</td>
                                    <td>{new Date(user.dob).toLocaleDateString()}</td>
                                    <td>
                                        <NavLink to={`/userForm/${user._id}`} className='action-icon-one' ><MdEdit /></NavLink>
                                        {/* <NavLink to={`/userForm/${user._id}`} className='action-icon-one' ><MdEdit /> </NavLink> */}
                                        <a href='#' className='action-icon-two' onClick={() => handleDelete(user._id)} ><MdDelete /> </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment >
    )
}

export default UserTable