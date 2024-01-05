
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {daleteUser} from './userReducer';
import { setUsers } from './userReducer';
import axios from 'axios';
function Home(){
  const [searchTerm, setSearchTerm] = useState('');
  const [originalUsers, setOriginalUsers] = useState([]); 
    const users = useSelector((state) => state.users)
    console.log(users)
    const dispatch = useDispatch();

    useEffect(() => {
      
        const fetchData = async () => {
          try {
            const response = await axios.get('https://dummyjson.com/todos');
            const todos = response.data.todos;
            dispatch(setUsers(todos));
            setOriginalUsers(todos); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    if(users.length > 0){
      return
    }else{
      fetchData();
      
    }
      }, [dispatch]);

      const handleDelete = async (id) => {
        try {
          await axios.delete(`https://dummyjson.com/todos/${id}`);
          dispatch(daleteUser({ id: id }));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
  

    const handleSearch = (value) => {
      setSearchTerm(value)
    if (value.trim() === '') {
      dispatch(setUsers(originalUsers));
    } else {
      const filteredUsers = users.filter((user) =>
        user.todo.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setUsers(filteredUsers));
      console.log(filteredUsers);
    }
    }
 
   

    return(
        <div className="container">
        <h2>Crud App with json Server</h2>
      <Link to='/Create' className='btn btn-success my-3'>Create +</Link>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search TODOs"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Todo</th>
                    <th>Action</th>
                </tr>
            </thead>
           <tbody>
            {users.map((user, index) => (
           <tr key={index}>
            <td>{user.id}</td>
            <td>{user.todo}</td>
            <td>
                <Link to={`/edit/${user.id}`} className="btn btn-sm btn-primary">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
            </td>
           </tr>
            ))}
           </tbody>
        </table>
        </div>
    )
}
export default Home