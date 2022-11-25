import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, remove, update} from "firebase/database";
import React, { useState, useEffect  } from 'react';
import { AddTaskForm } from './addTaskForm';
import { Task } from './task';
import { Modal } from "./Modal";
import { generateId } from './utilities';

/**
* This is the main part of the app.
* It handles rendering of the primary components and backend access.
* @return - Returns and renders the primary app. 
*/
function App() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState([]);

  /**
  * Initializing firebase config and access to the backend database.
  */
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

  /**
  * Fetching live taskslist from firebase DB, and saving it in tasks state.
  */
  useEffect(() => { 
    const tasksRef = ref(database, 'tasks/');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      setTasks(data);
   });
  }, []); // run it once

  /**
  * uploads new task (or an edited version) to the firebase backend. Also closes the edit modal if this function was accessed via edit modal.
  * The completion status is false by default.
  * @param {number} taskId - New ID for the task.
  * @param {string} title - Headline for the task.
  * @param {string} text - Main text of the task.
  * @param {string} date - Completion date for the task.
  * @param {boolean} attachment - Shows if the task has an attached file. Defaults to false as no attachments are uploaded ATM
  */
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

    /**
  * Deletes the task from backend.
  * @param {number} taskId - ID of the task to delete.
  */
  function removeTask(taskId) {
    remove(ref(database, 'tasks/' + taskId));
  }
  
    /**
  * Deletes the task from backend.
  * @param {number} taskId - ID of the task to delete.
  */
  function completeTask(taskId, status) {
    const statusUpdate = {complete : status};
    update(ref(database, 'tasks/' + taskId), statusUpdate);
  }

    /**
  * Looks up the provided ID of task to delete in the tasks state. Then saves this task in taskToEdit state, and opens an editing modal with this task.
  * @param {number} taskId - ID of the task to edit.
  */
  function editTask(taskId) {
    const target = Object.entries(tasks).filter(el => el[0] === taskId.toString());
    setTaskToEdit(target[0]);
    if (taskToEdit.length !== 0 ) {
      setIsOpen(true)
    }
  }

  return (
    <div className="App">
      <header className="task-header">
      <br/>Welcome to the task manager <br/>
          Describe the new task in the fields below or edit the existing ones.
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
