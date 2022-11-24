import React, {useState} from 'react'; 
const dayjs = require('dayjs')

export function Task(props) {
  const { task, removeTask, completeTask, editTask } = props;
  const [checked, setChecked] = useState(task.complete); 

  const checkDate = () => {
    const today = dayjs(new Date());
    const taskDate = dayjs(task.date);
    if (!today.isBefore(taskDate) && task.complete === false) {
      return "red";
    }
  };

  const handleRemoveClick = () => {
    removeTask(task.id);
  };

  const handleChange = () => {
    setChecked(!checked); 
    completeTask(task.id, checked);
  }

  const handleEdit = () => {
    editTask(task.id);
  };

  return (
    <li className="task">
      <div className="title"><b>{task.title}</b></div>
      <div className={"date " + checkDate()}>{task.date}</div>
      <div>remove task: <button
        aria-label="Remove task"
        className="remove-button"
        onClick={handleRemoveClick}
        >
        &times;
        </button>
      </div>
      <div className="text">{task.text} </div>
      <div className="attach">{task.attachment ? "link" : ""}</div>
      <div className="complete">completion: <input type="checkbox"  onChange={handleChange} checked={task.complete}/></div>
      <div> edit task: <button
        aria-label="Edit task"
        className="edit-button"
        onClick={handleEdit}
        >
        📝
        </button>
        </div>
    </li>
  );
}