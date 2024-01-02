const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
var bodyParser = require('body-parser');
const port = process.env.PORT ||5000;
const adminRoute = require('./routes/AdminRoutes');
const courseRoute = require('./routes/CoursesRoutes')
app.use(cors());
app.use(bodyParser.json());

app.use('/admin',adminRoute)
app.use('/course',courseRoute)
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})