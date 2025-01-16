require('dotenv').config();



const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutsRouter = require('./routes/workouts')


const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


app.use('/api/workouts/' , workoutsRouter)




mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connect db & listen on port ', process.env.PORT);
        });
    })

.catch((error) => {
    console.log(error)
})


module.exports = app;



