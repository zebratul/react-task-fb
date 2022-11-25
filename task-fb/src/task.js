import React, {useState} from 'react'; 
const dayjs = require('dayjs')

/**
* This is the task component.
* It displays the data from backend it recieves via props and allows to interact with via methods from props.
* @return - Returns and renders the task component. 
*/
export function Task(props) {
  const { task, removeTask, completeTask, editTask } = props;
  const [checked, setChecked] = useState(task.complete); 

  /**
  * A small completion date check using dayjs.
  * If the current date is before the completion date AND the task is not complete, it highlights the date in red.
  * @return {string}  - Returns a string to be used as a classname. 
  */
  const checkDate = () => {
    const today = dayjs(new Date());
    const taskDate = dayjs(task.date);
    if (!today.isBefore(taskDate) && task.complete === false) {
      return "red";
    }
  };

  /**
  * Handles task removing via calling a function from App component.
  */
  const handleRemoveClick = () => {
    removeTask(task.id);
  };

  /**
  * Handles task completion status. Task status is saved in state, and changed via calling a function from App component.
  */
  const handleChange = () => {
    setChecked(!checked); 
    completeTask(task.id, checked);
  }

  /**
  * Handles task editing. Task ID is passed back to App component, and a modal is opened from there.
  */
  const handleEdit = () => {
    editTask(task.id);
  };

  return (
    <li className="task">
      <div className="title"><b>{task.title}</b></div>
      <div className={"date " + checkDate()}>{task.date}</div>
      <div><i>remove task:</i> <button
        aria-label="Remove task"
        className="remove-button"
        onClick={handleRemoveClick}
        >
        &times;
        </button>
      </div>
      <div className="text">{task.text} </div>
      <div className="attach">{task.attachment ? "link" : ""}</div>
      <div> <i>edit task:</i> <button
        aria-label="Edit task"
        className="edit-button"
        onClick={handleEdit}
        >
        📝
        </button>
      <div className="complete"><i>completion:</i> <input type="checkbox"  onChange={handleChange} checked={task.complete}/></div>
        </div>
    </li>
  );
}
