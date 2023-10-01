const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

//DotEnv

dotenv.config()

//MONGODB CONNECTION
connectDB();

//REST OBJECT

const app = express()

//Middlewares

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Routes

app.use('/api/v1/auth',require('./routes/userRoutes'));
app.use('/api/v1/post',require('./routes/postRoutes'));
//home
app.get("/",(req,res)=>{
    res.status(200).send({
        "success":true,
        "msg":"Node server Running"
    })
})

//PORT 

const PORT = process.env.PORT || 8080;

//Listen

app.listen(PORT, ()=>{
    console.log(`server Running ${PORT}`.bgGreen.white);
});
