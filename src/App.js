import React, {useEffect, useState} from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:44373/api/User';

function App() {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({id: '', firstName:'', lastName:'', email:''});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect( ()=>{fetchUser();}, []);
  const fetchUser = async () => {
     try{
       const response = await axios.get(API_URL);
       setUsers(response.data);
     }catch(error){
      console.error('Error fetching Users', error);
     }
  }

  const fetchUserById = async (id)=>{
    try{
      const response = await axios.get('${API_URL}/${id}');
      setSelectedUser(response.data);
    }catch(error){
      console.error('Error fetching user:', error);
    }
  };

  const createUser = async () =>{
    try{
      await axios.post(API_URL, newUser);
      setNewUser({Id:'', firstName:'', lastName:'', email:''});
     // fetchUser();
    }catch(error){
      console.error('Error creating User:', error);
    }
  };

  const updateUser = async () =>{
    try{
      await axios.put('${API_URL}/${selectedUser.id}', selectedUser);
      setSelectedUser(null);
      fetchUser();
    }catch(error){
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id)=>{
    try{
      await axios.delete('${API_URL}/${id}');
      fetchUser();
    }catch(error){
      console.error('Error deleting user:', error);
    }
  };


  return (
    <div>
      <h1>User App</h1>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} - {user.lastName}
            {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => {
              fetchUserById(user.id);
            }}>Edit</button>
          </li>
        ))}
      </ul>

      <h2>Create User</h2>
      <input
        type="text"
        placeholder="firstName"
        value={newUser.firstName}
        onChange={(u) => setNewUser({ ...newUser, firstName: u.target.value })}
      />
      <input
        type="text"
        placeholder="lastName"
        value={newUser.lastName}
        onChange={(u) => setNewUser({ ...newUser, lastName: u.target.value })}
      />
      <input
        type="text"
        placeholder="email"
        value={newUser.email}
        onChange={(u) => setNewUser({ ...newUser, email: u.target.value })}
      />
      <button onClick={createUser}>Create</button>

      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="firstName"
            value={selectedUser.firstName}
            onChange={(u) => setSelectedUser({ ...selectedUser, title: u.target.value })}
          />
          <input
            type="text"
            placeholder="LastName"
            value={selectedUser.lastName}
            onChange={(u) => setSelectedUser({ ...selectedUser, description: u.target.value })}
          />
          <button onClick={updateUser}>Update</button>
          <button onClick={() => setSelectedUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
