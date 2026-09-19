const express = require('express')
const environments = require('./src/config/environment')
const routes = require('./src/routes/index')
const errorHandler = require("./src/utils/errorHandler")
const connectDB = require("./src/config/datbase")

const app = express()


connectDB()

app.use(express.json())



// app.get('/health', (req, res) => {
//     res.json({
//         status: 'OK',
//         message: 'Server Running'
//     })
// })

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