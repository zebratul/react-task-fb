import React from "react";
import { AddTaskForm } from './addTaskForm';

export function Modal(props) {
  const { setIsOpen, addTask, taskId, task} = props;

  return (
    <>
      <div className={"darkBG"} onClick={() => setIsOpen(false)} />
      <div className={"centered"}>
        <div className={"modal"}>
          <button className={"closeBtn"} onClick={() => setIsOpen(false)}>
          &times;
          </button>
            <AddTaskForm addTask={addTask} taskId={taskId} task={task}/>
        </div>
      </div>
    </>
  );
};
