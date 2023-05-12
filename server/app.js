const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./helpers/db')();
const fileUpload = require('express-fileupload');
const cors = require('cors')


// Router imports
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")

const app = express()



app.use(express.json())
app.use(fileUpload({}))
app.use(cors())
app.use(express.static('static'))

//Router
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const PORT = process.env.PORT || "3000"
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Portimiz ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
