// BUILD YOUR SERVER HERE
// IMPORTS
const express = require("express")
const User = require("./users/model.js")
// INSTANCE
const server = express()

//MIDDLEWARE
server.use(express.json())

//ENDPOINTS
// For all users
server.get("/api/users", (req, res) => {
    User.find()
    .then(users => {
        console.log(users)
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

// find user by id
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    User.findById(id)
    .then(users => {
        if (!users) {
            res.status(404).json("User not found")
        } else {
            console.log(users)
            res.status(200).json(users)
        }
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

// creating user
server.post("/api/users", (req, res) => {
    const newUser = req.body
    
    if(!newUser.name || !newUser.bio) {
        res.status(404).json("User requires name and bio")
    } else {
    User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
    }
})

//delete a user
server.delete("/api/users/:id", async (req,res) => {
    try {
        const id = req.params.id
        const deletedUser = await User.remove(id)
        if(!deletedUser) {
            res.status(422).json("User doesn't exist")
        } else {
            res.status(201).json(deletedUser)
        }   
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

// update a user
server.put("/api/users/:id", (req, res) => {
    
})

//CATCH ALL ENDPOINT
server.use("*", (req, res) => {
    res.status(200).json({message: "Does this work?"})
})



module.exports = server // EXPORT YOUR SERVER instead of {}
