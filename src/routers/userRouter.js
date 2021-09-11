const express = require('express')
const redisClient = require('../database/redis')
const router = express.Router()

router.post("/users/search", async(req, res) => {
    const id = req.body.id
    redisClient.hgetall(id, (error, user) => {
        if (!user)
            return res.render('index', {
                error: "ID not found"
            })
        user.id = id
        res.render('details', { user })
    })

})
router.get("/user/add", (req, res) => {
    res.render('adduser')
})
router.post("/user/add", (req, res) => {
    redisClient.hmset(req.body.id, [
        'firstname', req.body.first_name,
        'lastname', req.body.last_name,
        'email', req.body.email,
        'phone', req.body.phone
    ], (error, res) => {
        if (error)
            console.log(error)
    })
    redisClient.expire(req.body.id, 2000)
    res.redirect("/")
})
router.delete('/user/delete/:id', (req, res) => {
    const id = req.params.id
    redisClient.del(id)
    res.redirect("/")
})
module.exports = router