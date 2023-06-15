import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.scss';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
    }
  }, [role]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const isIncorrectEmail = (email) => {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const addEmailHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (
      name.length < 5 ||
      surname.length < 5 ||
      password.length < 5 ||
      isIncorrectEmail(email)
    ) {
      return;
    }

    const data = { name, surname, email, password };

    try {
      const response = await axios.post('/api/user', data);
      console.log('User added:', response.data);
      fetchUsers(); // Refresh
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      console.log('User deleted:', id);
      fetchUsers(); // Refresh
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="Dashboard-container">
      <h1>Create new user</h1>

      <form>
        <input ref={nameRef} type="text" placeholder="Name" />
        <input ref={surnameRef} type="text" placeholder="Surname" />
        <input ref={emailRef} type="text" placeholder="Email" />
        <input
          ref={passwordRef}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </button>
        <button type="submit" onClick={addEmailHandler}>
          Add User
        </button>
      </form>

      <table>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{showPassword ? user.password : '********'}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
