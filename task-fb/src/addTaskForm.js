import React, { useState } from 'react';
import { generateId, getNewExpirationTime } from './utilities';

export function AddTaskForm(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [headline, setHeadline] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  
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
  
  const handleFileChange = ({ target }) => {
    const { name, value } = target;
    setSelectedFile (value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTask = {
      id: generateId(),
      headline: headline,
      text: text,
      date: date,
    };
    if (text.length > 0) {
      props.addTask(newTask);
      setText("");
    }
  }

  return (
    <div className="task-input"> 
        <form onSubmit={handleSubmit}>
            <input
                value={headline}
                onChange={handleHeadlineChange}
                type="text"
                aria-label="Please name the task"
                placeholder="Please name the task"
            />
            
            <input
                value={text}
                onChange={handleTextChange}
                type="text"
                aria-label="describe the task"
                placeholder="describe the task"
            />

            <input
                value={date}
                onChange={handleDateChange}
                type="date"
                aria-label="please select completion date"
                placeholder="please select completion date"
            />

            <input
                value={selectedFile}
                onChange={handleFileChange}
                type="file"
                aria-label="optionally, upload a file"
                placeholder="optionally, upload a file"
            />

            <input type="submit" value="Add" />
        </form>
    </div>
  );
}
