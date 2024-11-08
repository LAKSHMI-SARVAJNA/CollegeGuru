const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter.js');
const CourseRoutes = require('./Routes/CourseRoutes.js');

require('dotenv').config();
require('./config/db.js');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/courses', CourseRoutes);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});