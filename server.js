var express = require("express")
const mongoose = require("mongoose")
const employeeRoutes = require("./routes/employeeRoutes")
const userRoutes = require("./routes/userRoutes")
let app = express()
const SERVER_PORT = 8090
const DB_URL = "mongodb+srv://M727-Y:M727-Y@cluster0.fbvfjtf.mongodb.net/Assignment2Db?retryWrites=true&w=majority"
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:3000"
}))
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded())


app.use("/api/", employeeRoutes)
app.use("/api/", userRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>welcome</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})