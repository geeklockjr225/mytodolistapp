require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')









const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use("/auth",authRoutes)
app.use("/tasks",taskRoutes)




app.listen(3000, () => console.log("Serveur sur port 3000"));