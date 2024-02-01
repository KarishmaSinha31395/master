
import express from 'express';
import * as mongoose from 'mongoose';
import basicAuth from 'basic-auth';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import routes from './routes/ToDoRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Authentication Middleware
const authenticate = (req, res, next) => {
  const user = basicAuth(req);

  // Check if user credentials are valid
  if (!user || user.name !== process.env.BASIC_AUTH_USERNAME || user.pass !== process.env.BASIC_AUTH_PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Unauthorized');
  }

  // User is authenticated
  next();
};

// Apply authentication middleware to the entire API
app.use("/api", authenticate, routes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));


export default app; 