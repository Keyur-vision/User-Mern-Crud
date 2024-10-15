import React, { Fragment, useContext, useEffect, useState } from 'react'
import { getLastLoginUsers } from '../../services/user';
import "../../style/pages/userTable.scss";

function LastLoginUsers() {
    const [users, setUsers] = useState([])

    const newData = async () => {
        try {
            const getUsers = await getLastLoginUsers();
            setUsers([...getUsers.data])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        newData();
    }, [])

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
                                <th>Last Login</th>
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
                                    <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment >
    )
}

export default LastLoginUsers