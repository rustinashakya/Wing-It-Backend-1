const mongoose = require('mongoose')
const environments = require('./environment')


const connectDB = async () => {
    try {
        await mongoose.connect(environments.dbUrl)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error connecting to database", error)
        process.exit(1)
    }
}


module.exports = connectDB