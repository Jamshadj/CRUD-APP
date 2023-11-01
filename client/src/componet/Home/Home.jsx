import axiosInstance from '../../services/axiosInstance';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Home({ onAddTask }) {

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
      axiosInstance().post('/user/tasks', { description, userId })
        .then((response) => {
          Swal.fire('Success!', 'Task added successfully!', 'success');
          // Call the callback function to update tasks state in the parent component
          onAddTask(response.data); // Assuming the response contains the new task data
        })
        .catch((error) => {
          console.log(error);
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
