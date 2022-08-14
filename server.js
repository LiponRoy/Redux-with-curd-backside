const { response } = require('express');
const express = require('express');
const app = express();
const { errorHandler } = require('./middleware/errorMiddleware');
// mongo connect
const mongodb_con = require('./DB_connect/MongodbMe');
const dotenv = require('dotenv').config();
//getting router
const userRouter = require('./router/userRouter');
//getting port form env file.
const port = process.env.PORT;

//connection with database with monggodb atlas and compass url
mongodb_con();
// all Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(userRouter);

app.listen(port, () => console.log(`server started on port ${port}`));
