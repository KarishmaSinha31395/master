import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import styled from 'styled-components';

/*The css for the dispaly the login page and actual application page is used here. styled-components package is used
it allows to write actual CSS code to style your components. 
It also removes the mapping between components and styles – using components as a low-level styling construct 
could not be easier! */

const LoginContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 15vh;
background-color: #fde3a7; /* Light orange background color */

.login-title {
  margin-bottom: 20px;
  color:black;
}

button {
  padding: 10px;
  background-color: #3498db; /* Button background color */
  color: #fff; /* Button text color */
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width:100px;
  font-size: medium;
}
`;
const PageContainer = styled.div`
background-color: #fde3a7; /* Light orange background color */
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`;
const Logo = styled.img`
width: 100px; /* Adjust the width as needed */
height: 100px; /* Adjust the height as needed */
margin-top: 20px;
`;

const ToDoContainer = styled.div`
background-color: #fde3a7; /* Light orange background color */
padding: 20px;
text-align: center;

.title {
margin-bottom: 20px;
}

.ribbon {
background: url('https://bizcuit.nl/wp-content/uploads/2022/11/cropped-logo-bizcuit.png.webp') no-repeat center center;
background-size: contain;
height: 100px; /* Adjust the height as needed */
width: 100%;
margin-bottom: 20px;
}

input {
padding: 10px;
border: 1px solid #ddd;
border-radius: 5px;
}


`;

//This is the main entry point for the application. Here user first logs in and if successfull then can access the actual application
const App = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [toDos, setToDos] = useState([]);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taskstatus, setTaskStatus] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const username = import.meta.env.VITE_AUTH_USERNAME;
  const password = import.meta.env.VITE_AUTH_PASSWORD;



  useEffect(() => {
    if (isAuthenticated) {
      // Fetch data only if the user is authenticated
      axios
        .get(`${baseURL}/get`,{
          auth: {
            username: username,
            password: password,
          },
        })
        .then((res) => setToDos(res.data))
        .catch((err) => console.log(err));
    }
  }, [updateUI, isAuthenticated]);

  const saveToDo = () => {
    // Check if the user is authenticated before saving ToDo
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      loginWithRedirect();
      return;
    }

    let requestSave = { task, deadline, taskstatus };

    axios
      .post(`${baseURL}/save`, requestSave,{
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setTask("");
        setDeadline("");
        setTaskStatus("");
      })
      .catch((err) => console.log(err));
  };

    return (

      <main>
        <PageContainer>
        <Logo src="https://bizcuit.nl/wp-content/uploads/2022/11/cropped-logo-bizcuit.png.webp" alt="Bizcuit Logo" />
        {isAuthenticated ? (
      <ToDoContainer>
            <h1 className="title">ToDo App</h1>
          <div className="input_holder">
          <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              type="text"
              placeholder="Add Task"
              
              
            />
            <input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              type="date"
              placeholder="Add deadline"
              
            />
            <select
              value={taskstatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="">Select Task Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              
            </select>
            
            <button onClick={saveToDo}>Add</button>
          </div>

            <div className="list">
              {toDos.map((el) => (
                <ToDo
                  key={el._id}
                  text={el.task}
                  deadline={new Date(el.deadline).toLocaleDateString()}
                  taskstatus={el.taskstatus}
                  id={el._id}
                  setUpdateUI={setUpdateUI}
                  setDeadline={setDeadline}
                  
                  setShowPopup={setShowPopup}
                  setPopupContent={setPopupContent}
                />
              ))}
            </div>
            
            </ToDoContainer>
          
        ) : (
          <LoginContainer>
            <h1 className="login-title">Please Log In</h1>
            <div className="ribbon"></div>
            <button onClick={() => loginWithRedirect()}>Log In</button>
          </LoginContainer>
        )}

        {showPopup && (
          <Popup
            setShowPopup={setShowPopup}
            popupContent={popupContent}
            setUpdateUI={setUpdateUI}
          />
        )}
        </PageContainer>
      </main>
    );
};

export default App;
