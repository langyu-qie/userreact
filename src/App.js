// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// const API_URL = 'https://localhost:44373/api/User';

// function App() {

//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({Id: '', Name:'', Email:''});
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect( ()=>{fetchUser();}, []);
//   const fetchUser = async () => {
//      try{
//        const response = await axios.get(API_URL);
//        setUsers(response.data);
//      }catch(error){
//       console.error('Error fetching Users', error);
//      }
//   }

//   const fetchUserById = async (id)=>{
//     try{
//       const response = await axios.get('${API_URL}/${id}');
//       setSelectedUser(response.data);
//     }catch(error){
//       console.error('Error fetching user:', error);
//     }
//   };

//   const createUser = async () =>{
//     try{
//       await axios.post(API_URL, newUser);
//       setNewUser({Id: '', Name:'', Email:''});
//      // fetchUser();
//     }catch(error){
//       console.error('Error creating User:', error);
//     }
//   };

//   const updateUser = async () =>{
//     try{
//       await axios.put('${API_URL}/${selectedUser.id}', selectedUser);
//       setSelectedUser(null);
//       fetchUser();
//     }catch(error){
//       console.error('Error updating user:', error);
//     }
//   };

//   const deleteUser = async (id)=>{
//     try{
//       await axios.delete('${API_URL}/${id}');
//       fetchUser();
//     }catch(error){
//       console.error('Error deleting user:', error);
//     }
//   };


//   return (
//     <div>
//       <h1>User App</h1>

//       <h2>Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.Id}>
//             {user.Name}
//             {user.Email}
//             <button onClick={() => deleteUser(user.Id)}>Delete</button>
//             <button onClick={() => {
//               fetchUserById(user.Id);
//             }}>Edit</button>
//           </li>
//         ))}
//       </ul>

//       <h2>Create User</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={newUser.Name}
//         onChange={(u) => setNewUser({ ...newUser, Name: u.target.value })}
//       />

//       <input
//         type="text"
//         placeholder="Email"
//         value={newUser.Email}
//         onChange={(u) => setNewUser({ ...newUser, Email: u.target.value })}
//       />
//       <button onClick={createUser}>Create</button>

//       {selectedUser && (
//         <div>
//           <h2>Edit User</h2>
//           <input
//             type="text"
//             placeholder="Name"
//             value={selectedUser.Name}
//             onChange={(u) => setSelectedUser({ ...selectedUser, title: u.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Email"
//             value={selectedUser.Email}
//             onChange={(u) => setSelectedUser({ ...selectedUser, description: u.target.value })}
//           />
//           <button onClick={updateUser}>Update</button>
//           <button onClick={() => setSelectedUser(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = 'https://localhost:44373/api/User';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);
  

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

  const handleInputChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        API_URL,
        newUser
      );
      setUsers([...users, response.data]);
      setNewUser({
        name: '',
        email: '',
      });
      
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/${selectedUser.id}`,
        newUser
      );
      const updatedUsers = users.map((user) =>
        user.id === response.data.id ? response.data : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
      setNewUser({
        name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>API Consumer</h1>

      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <h2>{selectedUser ? 'Update User' : 'Create User'}</h2>
      <form onSubmit={selectedUser ? handleUpdate : handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">{selectedUser ? 'Update' : 'Create'}</button>
        {selectedUser && (
          <button type="button" onClick={() => setSelectedUser(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default App;

