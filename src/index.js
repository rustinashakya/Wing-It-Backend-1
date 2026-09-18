const express = require('express')
const environments = require('./config/environment')
const routes = require('./routes/index')
const errorHandler = require("./utils/errorHandler")
const app = express()



const connectDB = require("./config/datbase")



connectDB()


app.use(express.json())



app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server Running'
    })
})

app.use("/api/", routes)



// error handle middleware
app.use(errorHandler)







// server start
app.listen(environments.port, (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`server is running on port ${environments.port}`)
    }
})