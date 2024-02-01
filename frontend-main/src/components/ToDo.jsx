import axios from "axios";
import React from "react";
//require('dotenv').config();
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";
import styled from 'styled-components';


/*The css for the dispaly of all the 3 part of the task list is displayed here. styled-components package is used
it allows to write actual CSS code to style your components. 
It also removes the mapping between components and styles – using components as a low-level styling construct 
could not be easier! */

const DisplayItem = styled.div`
  display: flex;
  align-items: center;
`;

const FirstItem = styled.div`
  width: 100px; /* Fixed width for the first item */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SecondItem = styled.div`
  margin-left: 40px; /* Adjust as needed */
`;

const ThirdItem = styled.div`
  margin-left: 40px; /* Adjust as needed */
`;

// To delete the task list as well as populate the ribbon displaying the added task detail
const username = import.meta.env.VITE_AUTH_USERNAME;
const password = import.meta.env.VITE_AUTH_PASSWORD;

const ToDo = ({ text, id,deadline,taskstatus, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`,{
      auth: {
        username: username,
        password: password,
      },
    }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id, deadline, taskstatus });
    setShowPopup(true);
  };

  return (
    <div className="toDo">
      <DisplayItem>
      <FirstItem>{text}</FirstItem>
      <SecondItem>{deadline}</SecondItem>
      <ThirdItem>{taskstatus}</ThirdItem>
    </DisplayItem>
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDo;
