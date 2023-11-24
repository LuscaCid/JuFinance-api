require('express-async-errors')
require('dotenv').config()
const express = require('express')
const cors = require('cors');
const AppError = require('./utils/AppError');
const app = express();
app.use(cors());
app.use(express.json());

const principalRouter = require('./routes')
app.use(principalRouter)

const PORT = process.env.PORT || 3000;


app.use((error ,req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.status).json({
            message : error.message,
            status : error.status
        })
    }
    return res.status(500).json({
        message : "Internal server error",
        status : 500
    })
})


app.listen(PORT, () => {
    return console.log(`the server is running on port ${PORT}`)
})