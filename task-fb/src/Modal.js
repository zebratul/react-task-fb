import React from "react";
import { AddTaskForm } from './addTaskForm';

/**
* This is the task edit modal component.
* It handles editing of the task by covering the rest with dark background and bringing your attention to the task form component.
* @return - Returns and renders task editing modal. 
*/
export function Modal(props) {
  /**
  * This is the task edit modal.
  * @param props - modal recieves task ID and other info from the app. It then drills those props deeper to the form component to fill it with data.
  */
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
