require("dotenv").config()

const mongoose = require('mongoose')

const mongoURI = process.env.mongoDBURI

const initializeDatabase = async () => {
    try{
        const connection = await mongoose.connect(mongoURI)
        if(connection){
            console.log("Connected sucessfully")
        }
    }catch(error){
        console.log("Connection failed : ", error)
    }
}

module.exports = {initializeDatabase}