const { response } = require('express');
const express = require('express');
const app = express();
const { errorHandler } = require('./middleware/errorMiddleware');
// mongo connect
const mongodb_con = require('./DB_connect/MongodbMe');
const dotenv = require('dotenv').config();
//getting router
const phoneRouter = require('./router/phoneRouter');
const userRouter = require('./router/user');
//getting port form env file.
const port = process.env.PORT;

//connection with database with monggodb atlas and compass url
mongodb_con();
// all Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use('/phone', phoneRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`server started on port ${port}`));
