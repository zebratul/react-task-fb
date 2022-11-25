import React, { useState } from 'react';

/**
* This is the task creation form component.
* It stores user inputs in states, and uses that data to upload it using addTask function provided in props from app.
* @return - Returns and renders task creation component. 
*/
export function AddTaskForm(props) {
  const { task, taskId } = props;
  const [selectedFile, setSelectedFile] = useState("");
  const [attachment, setAttachment] = useState(false);
  const [headline, setHeadline] = useState(task.title);
  const [text, setText] = useState(task.text);
  const [date, setDate] = useState(task.date);
  
  const handleHeadlineChange = ({ target }) => {
    const { name, value } = target;
    setHeadline (value);
  };

  const handleTextChange = ({ target }) => {
    const { name, value } = target;
    setText (value);
  };
  
  const handleDateChange = ({ target }) => {
    const { name, value } = target;
    setDate (value);
  };

  const handleFileChange = (event) => {
    setSelectedFile (event.target.files[0]);
    setAttachment(true);
  }

  /**
  * After user submits the form, the components calls addTask function to store the data in backend, and clear the fields.
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.length > 0) {
      props.addTask(taskId, headline, text, date, attachment, selectedFile);
      setText("");
      setHeadline("");
    }
  }

  return (
    <div className="task-input"> 
        <form onSubmit={handleSubmit} className="form">
            <div className="inputs-container">
            <input
                className="input"
                value={headline}
                onChange={handleHeadlineChange}
                type="text"
                placeholder="Please name the task"
            />
            
            <input
                className="input"
                value={text}
                onChange={handleTextChange}
                type="text"
                placeholder="Describe the task details"
            />

            <label>
            Select the task completion date 
            <input
                className="input"
                value={date}
                onChange={handleDateChange}
                type="date"
            />
            </label>

            <label>
            Choose a file to upload
            <input
                className="input"
                onChange={handleFileChange}
                type="file"
            />
            </label>

            </div>

            <div className='submit-btn'>
              <input type="submit" value="Add task" />
            </div>
        </form>
    </div>
  );
}
