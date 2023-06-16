const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const UserRoutes = require('../server/Routes/UserRoutes')
// const Routes = require('../server/Routes/UserRoutes')
const AdminRoutes = require('../server/Routes/AdminRoutes')
require('dotenv').config();


const app = express();

app.listen(4000, () => {
    console.log("server started 4000......");
})

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connnected to mognodb");
}).catch(err => {
    console.log(err.message);
})

app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET,POST'],
    credentials:true
}))

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', UserRoutes);

app.use('/admin',AdminRoutes)
