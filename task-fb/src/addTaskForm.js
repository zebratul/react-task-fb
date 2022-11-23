import React, { useState } from 'react';
import { generateId, getNewExpirationTime } from './utilities';

export function AddTaskForm(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [attachment, setAttachment] = useState(false);
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
    setAttachment(true);
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
      props.addTask(generateId(), headline, text, date, attachment);
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
                placeholder="Describe the task"
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
                value={selectedFile}
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
