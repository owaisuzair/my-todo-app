import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addUser} from './userReducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Create(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     dispatch(addUser({id: users[users.length - 1].id + 1, name, email}))
    //     navigate('/')
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(`https://dummyjson.com/todos/add`, {
            todo:name,
            completed:false,
            userId:5,
          });
      console.log("hello", response)
      if(response.data){
        dispatch(
            addUser({
                id:response.data.id,
                todo:response.data.todo,
                completed:false,
                userId:response.data.userId,
            })
          );
      }
        
          navigate('/');
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error status:', error.response.status);
            console.error('Error response data:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
          }
        }
      };
    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-100 border bg-secondary text-white p-5'>
        <h1>add Todo</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>todo</label>
                <input type='text' name='name' className='from-control' placeholder='enter name'
                 onChange={(e) => setName(e.target.value)}/>
            </div>
            <br/>
            <button type='submit' className='btn btn-info'>submit</button>
        </form>
      </div>
        </div>
    )
}
export default Create
