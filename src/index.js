const express = require('express')
const methodOverride = require('method-override')

// Connecting to redis
const redisClient = require('./database/redis')
redisClient.on('connect', () => { console.log("Connected to redis!") })

// Setting Port
const port = 3000

// App init
const app = express()


// Setting handlebar template
app.set('view engine', 'ejs')
app.set('views', 'views')


// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Use routers
// require routers
const userRouter = require('./routers/userRouter')
app.use(userRouter)


app.get('/', (req, res) => {
    res.render('./index')
})


// Init listen
app.listen(port, () => { console.log("now listening on port: " + port) })