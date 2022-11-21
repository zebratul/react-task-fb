import React, { useEffect } from 'react';

export function Task(props) {
  const { task, removeTask, completeTask } = props;

  const handleRemoveClick = () => {
    removeTask(task.id);
  };

//   useEffect(() => {
//     const timeRemaining = thought.expiresAt - Date.now();
//     const timer = setTimeout(() => {
//       removeThought(thought.id)
//     }, timeRemaining);
//     return () => clearTimeout(timer);
//   }, [thought]);
  

  return (
    <li className="task">
      <button
        aria-label="Remove task"
        className="remove-button"
        onClick={handleRemoveClick}
      >
        &times;
      </button>
      <div className="text">{task.headline} desc: {task.text} exp.date: {task.date}</div>
    </li>
  );
}