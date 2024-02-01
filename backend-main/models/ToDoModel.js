
import * as mongoose from 'mongoose';
//defining the model for the table to save, get the tasks list in mongoose
const toDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  taskstatus: {
    type: String,
    required: true
  }
});
const ToDoModel = mongoose.model('ToDo', toDoSchema);

export default ToDoModel;
