import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from "firebase/database";
import React, { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import { AddTaskForm } from './addTaskForm';
import { Task } from './task';
import { generateId, getNewExpirationTime } from './utilities';

function App() {
  const [tasks, setTasks] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyCtBuVLyKIbqAAE4DjFIoldQrlkjy9kYU0",
    authDomain: "todo-list-9cfcb.firebaseapp.com",
    databaseURL: "https://todo-list-9cfcb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todo-list-9cfcb",
    storageBucket: "todo-list-9cfcb.appspot.com",
    messagingSenderId: "1022605290952",
    appId: "1:1022605290952:web:862324374de0a194ce64fd"
  };
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => { //fetching live taskslist from firebase DB
    const tasksRef = ref(database, 'tasks/');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setTasks(data);
   });
  }, []); // run it once

  function writeUserData(taskId, headline, desc, attachment) {
    set(ref(database, 'tasks/' + taskId), {
      headline: headline,
      description: desc,
      attachment : attachment
    });
  }

  const addTask = (task) => {
    setTasks ((prev) => ([
      ...prev,
      task
    ]));
  }

  const removeTask = (tasktIdToRemove) => {
    const filtered = tasks.filter(task => task.id !== tasktIdToRemove)
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
