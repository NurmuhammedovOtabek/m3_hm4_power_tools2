const express = require("express")
require("dotenv").config()

const indexRouter = require("./routers")

const PORT = process.env.PORT ?? 3030

const app = express()
app.use(express.json())

app.use("/api", indexRouter)

app.listen(PORT, ()=>{
    console.log(`Server startd at http://localhost:${PORT}`);
})