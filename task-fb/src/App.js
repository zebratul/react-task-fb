import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, remove, update} from "firebase/database";
import React, { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import { AddTaskForm } from './addTaskForm';
import { Task } from './task';
import { Modal } from "./Modal";
import { generateId, getNewExpirationTime } from './utilities';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState([]);

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
    console.log(tasks);
    const tasksRef = ref(database, 'tasks/');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      console.log(Object.entries(data));
      setTasks(data);
   });
  }, []); // run it once

  function addTask(taskId, title, text, date, attachment) {
    set(ref(database, 'tasks/' + taskId), {
      id: taskId,
      title: title,
      text: text,
      date: date, 
      attachment: attachment,
      complete: false
    });
    setIsOpen(false);
  }

  function removeTask(taskId) {
    remove(ref(database, 'tasks/' + taskId));
  }
  
  function completeTask(taskId, status) {
    const statusUpdate = {complete : status};
    update(ref(database, 'tasks/' + taskId), statusUpdate);
  }

  function editTask(taskId) {
    console.log(taskId);
    const target = Object.entries(tasks).filter(el => el[0] === taskId.toString());
    setTaskToEdit(target[0]);
    if (taskToEdit.length !== 0 ) {
      setIsOpen(true)
    }
  }

  return (
    <div className="App">
      <header className="task-header">
          This is a header for the task app <br/>
          {isOpen && <Modal setIsOpen={setIsOpen} taskId={taskToEdit[0]} task={taskToEdit[1]} addTask={addTask}/>}
      </header>
      <main>
        <AddTaskForm addTask={addTask} editTask={editTask} task={{}} taskId={generateId()}/>
        <ul className="tasks">
          {tasks==0 ? "loading..." : Object.entries(tasks).map((task) => (
          <Task key={task[0]} task={task[1]} removeTask={removeTask} completeTask={completeTask} editTask={editTask}/>
          ))}
        </ul>
      </main>
    </div>

  );
}


export default App;
