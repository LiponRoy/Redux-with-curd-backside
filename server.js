const { response } = require('express');
const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errorMiddleware');
// mongo connect
const mongodb_con = require('./DB_connect/MongodbMe');
const dotenv = require('dotenv').config();
//getting router
const phoneRouter = require('./router/phoneRouter');
const userRouter = require('./router/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// // Handling uncaught Exception
process.on('uncaughtException', err => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server for Handling uncaught Exception`);
});

//connection with database with monggodb atlas and compass url
mongodb_con();

// all Middleware
//cors middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/phone', phoneRouter);
app.use('/user', userRouter);
//error middleware
app.use(errorMiddleware);

//server creating ..
const serverMy = app.listen(process.env.PORT, () => {
	console.log(`server started on port called ${process.env.PORT}`);
});

// Unhandled promise rejection
process.on('unhandledRejection', err => {
	console.log(`Shutting down server for ${err.message}`);
	console.log(`Shutting down the server due to Unhandled promise rejection`);
	serverMy.close(() => {
		process.exit(1);
	});
});
