import moment from 'moment';
import ToDoModel from '../models/ToDoModel.js';

//Get task
export const getToDos = async (req, res) => {
  const toDos = await ToDoModel.find();
  res.send(toDos);
};

//Save Task
export const saveToDo = (req, res) => {
  const { task, deadline,taskstatus } = req.body;
  // const deadlineFormat =moment(deadline, "DD/MM/YYYY").toDate();
  ToDoModel.create({ task, deadline ,taskstatus})
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

//Update Task
export const updateToDo = (req, res) => {
  const { id } = req.params;
  const { task, deadline, taskstatus } = req.body;

  // Build the update object based on the provided fields
  const updateObject = {};
  if (task !== undefined) updateObject.task = task;
  if (deadline !== undefined) updateObject.deadline = moment(deadline, "YYYY-MM-DD").toDate();
  if (taskstatus !== undefined) updateObject.isdone = taskstatus;
  //const deadlineDate = new Date(deadline);
  ToDoModel.findByIdAndUpdate(id, updateObject)
    .then(() => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};
//Delete Task
export const deleteToDo = (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
