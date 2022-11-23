import React from 'react';
const dayjs = require('dayjs')

export function Task(props) {
  const { task, removeTask, completeTask } = props;

  const checkDate = () => {
    const today = dayjs(new Date());
    const taskDate = dayjs(task.date);
    if (!today.isBefore(taskDate)) {
      return "red";
    }
  };

  const handleRemoveClick = () => {
    removeTask(task.id);
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
      <div className="complete">completion: <input type="checkbox"/></div>
    </li>
  );
}