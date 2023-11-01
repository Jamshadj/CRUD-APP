import axiosInstance from '../../services/axiosInstance';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Home() {
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = async () => {
    const { value: description } = await Swal.fire({
      title: 'Add Your Task',
      input: 'text',
      inputPlaceholder: 'Enter task description...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Task description is required!';
        }
      },
    });
    const userId = localStorage.getItem('userId');
    if (description) {
      // Send the task description to the backend
      axiosInstance().post('/user/tasks', { description,userId })
        .then((response) => {
          Swal.fire('Success!', 'Task added successfully!', 'success');
        })
        .catch((error) => {
          Swal.fire('Error!', 'Failed to add task.', 'error');
        });
    }
  };

  return (
    <div>
      <div>Add your task</div>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default Home;
