const express = require('express');
const users = require("./models/users")
const routers = express.Router

router.get("/users", async (req, res)=>{
    const users = await users.find()
    res.send(users)
})
module.exports = router;


