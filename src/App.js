// Client-side code (React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('https://webdev5-fb2f4156b74d.herokuapp.com/api/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const response = await axios.post('https://webdev5-fb2f4156b74d.herokuapp.com/api/tasks', { title: newTask });
    setTasks([...tasks, response.data]);
    setNewTask('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://webdev5-fb2f4156b74d.herokuapp.com/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const response = await axios.put(`https://webdev5-fb2f4156b74d.herokuapp.com/api/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(task => (task._id === id ? response.data : task)));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              onClick={() => toggleComplete(task._id, task.completed)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



