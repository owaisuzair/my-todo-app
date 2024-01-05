import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { updateUser } from './userReducer';
import axios from 'axios';
function Update() {
    const {id} =useParams();
    const users = useSelector((state) => state.users);
    const existingUser = users.filter((user) => user.id == id);
    const { name = ''} = existingUser.length > 0 ? existingUser[0] : {};
    const [todo, setTodo] = useState(name)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        console.log('Updating user with id:', id);
        const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
          todo:todo,
          completed:false,
        });
        console.log("hey", response)
        if(response.data){
          dispatch(
              updateUser({
                  id:response.data.id,
                  todo:response.data.todo,
                  completed:false,
                
              })
            );
        }
        navigate('/');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };


  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-100 border bg-secondary text-white p-5'>
        <h1>updata todo</h1>
        <form onSubmit={handleUpdate}>
            <div>
                <label htmlFor='name'>todo:</label>
                <input type='text' name='todo' className='from-control' placeholder='enter name' value={todo} onChange={(e) => setTodo(e.target.value)}/>
            </div>
            <br/>
            <button type='submit' className='btn btn-info'>submit</button>
        </form>
      </div>
        </div> )
}

export default Update

