import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const usersJSON = sessionStorage.getItem('users');
  const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

  const loggedInUserJSON = sessionStorage.getItem('loggedInUser');
  if (!loggedInUserJSON) {
    navigate('/login');
  }

  const logout = () => {
    sessionStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="page-container">
        <div className="home-container">
        <h2>Welcome to Home Page</h2>
        <button onClick={logout} className="logout-btn">Logout</button>
        <h3>Registered Users:</h3>
        <table>
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Phone Number</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {users.length > 0 ? (
                users.map((user, idx) => (
                <tr key={idx}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.email}</td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={4}>No users registered yet.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default HomePage;
