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

  const fetchTaskById = async (id) => {
    try {
      const response = await axios.get(`https://webdev5-fb2f4156b74d.herokuapp.com/api/tasks/${id}`);
      alert(`Task: ${response.data.title}\nCompleted: ${response.data.completed}`);
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Failed to fetch task.');
    }
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

  const apiRoutes = [
    { method: 'GET', path: '/api/tasks', description: 'Get all tasks' },
    { method: 'GET', path: '/api/tasks/:id', description: 'Get single task by ID' },
    { method: 'POST', path: '/api/tasks', description: 'Create new task' },
    { method: 'DELETE', path: '/api/tasks/:id', description: 'Delete task by ID' }
  ];

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
            <button onClick={() => fetchTaskById(task._id)}>View</button>
          </li>
        ))}
      </ul>

      <div className="api-routes">
        <h2>API Routes</h2>
        <ul>
          {apiRoutes.map(route => (
            <li key={route.path}>
              <strong>{route.method}</strong> - 
              <a href={`https://webdev5-fb2f4156b74d.herokuapp.com${route.path}`} target="_blank" rel="noopener noreferrer">
                {route.path}
              </a> - {route.description}
            </li>
          ))}
        </ul>
        <p>Base API URL: 
          <a href="https://webdev5-fb2f4156b74d.herokuapp.com/" target="_blank" rel="noopener noreferrer">
            https://webdev5-fb2f4156b74d.herokuapp.com/
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;




