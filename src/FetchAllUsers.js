import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:44373/api/User'; // Update with your API URL


function FetchAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FetchAllUsers;
