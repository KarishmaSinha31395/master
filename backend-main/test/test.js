import * as chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

chai.use(chaiHttp);
const { expect } = chai;
let createdToDoId;

describe('To-Do API Tests', () => {

  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;
  
  it('should get To-Dos', async () => {
    const response = await axios.get('http://localhost:5000/api/get', {
      auth: {
        username: username,
        password: password,
      },
    });
    
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('array');
  });

  it('should save a new To-Do', async () => {
    const newToDo = {
      task: 'Test Task1',
      deadline: '2024-03-24', // Set a future deadline
      taskstatus: 'Incomplete',
    };
  
   
    const res = await axios.post('http://localhost:5000/api/save', newToDo, {
      auth: {
        username: username,
        password: password,
      },
    });
    createdToDoId = res.data._id;
    expect(res).to.have.status(201);
    expect(res.statusText).equal('Created')
    expect(res.data).to.be.an('object');
    expect(res.data.task).to.equal(newToDo.task);
  });
  

  it('should update a To-Do', async () => {
    
    const updatedToDo = {
      task: 'Updated Test Task',
      deadline: '2024-03-24', // Set a future deadline
      taskstatus: 'Incomplete',
    };

    const res = await axios.put(`http://localhost:5000/api/update/${createdToDoId}`, updatedToDo, {
      auth: {
        username: username, 
        password: password,
      },
    });
    //console.log(res)
    expect(res).to.have.status(200);
    expect(res.data).to.equal('Updated Successfully....');
  });

  it('should delete a To-Do', async () => {
    const toDoIdToDelete = createdToDoId;
    const res = await axios.delete(`http://localhost:5000/api/delete/${toDoIdToDelete}`, {
    auth: {
      username: username,
      password: password, 
    },
  });
    expect(res).to.have.status(200);
    expect(res.data).to.equal('Deleted Successfully....');
  });
});
