import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AddTaskForm } from './addTaskForm';
import { Task } from './task';
import { generateId, getNewExpirationTime } from './utilities';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: generateId(),
      text: 'This is a test task #1',
      expiresAt: getNewExpirationTime(),
    },
    {
      id: generateId(),
      text: "This is a test task #2",
      expiresAt: getNewExpirationTime(),
    },
  ]);

  const addTask = (task) => {
    setTasks ((prev) => ([
      ...prev,
      task
    ]));
  }

  const removeTask = (tasktIdToRemove) => {
    const filtered = tasks.filter(task => task.id != tasktIdToRemove)
    setTasks(filtered);
  }
  
  return (
    <div className="App">
      <header className="task-header">
          This is header for the task app
      </header>
      <main>
        <AddTaskForm addTask={addTask}/>
        <ul className="tasks">
          {tasks.map((task) => (
            <Task key={task.id} task={task} removeTask={removeTask}/>
          ))}
        </ul>
      </main>
    </div>

  );
}

export default App;
