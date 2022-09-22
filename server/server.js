import express from 'express'
import cors from 'cors'
import users from './api/users.route.js'

const morgan = require("morgan")
const app = express()


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json)

app.use("/api/v1/users", users)
app.use('*', (req,res) => {
    res.status(404).json({error: "not found"})
})

export default app