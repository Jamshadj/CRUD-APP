import HomePage from '../Home/Home';
import BasicTable from '../DataTable/DataTable';
import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <HomePage onAddTask={addTask} />
      <BasicTable tasks={tasks} />
    </div>
  );
}

export default TaskManager;
