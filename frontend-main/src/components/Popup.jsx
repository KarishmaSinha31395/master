import axios from "axios";
import React, { useState,useEffect } from "react";

import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const [task, setTask] = useState(popupContent.text);
  const [deadline, setDeadline] = useState(popupContent.deadline || '');
  const [taskstatus, setTaskStatus] = useState(popupContent.taskstatus || '');
  const username = import.meta.env.VITE_AUTH_USERNAME; 
  const password = import.meta.env.VITE_AUTH_PASSWORD;

  //It populates the pop up button that allows us to update the update the Task list
  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, { task, deadline,taskstatus },{
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
       
      });
  };
  
  return (
    <div className="backdrop">
      <div className="popup">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update Task</h1>
        <div className="popup__input_holder">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Update Task"
          />
          <input
            value={deadline}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              // Format the date as "yyyy-MM-dd"
              const formattedDate = selectedDate.toISOString().split('T')[0];
              setDeadline(formattedDate);}}
            type="date"
            placeholder="Update Deadline"
          />
          <select
            value={taskstatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <placeholder>"Select Status</placeholder>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={updateToDo}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

