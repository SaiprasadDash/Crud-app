var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=> {
    // Validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be empty !!"})
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })
    
    // Save user in database
    user
        .save(user)
        .then(data=>{
            // res.send(data)
            res.redirect("/add-user")
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while creating operation"
            });
        });
}

// retrive and return all user/ retrive and resive a single person
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message:"Not found user with id" + id})
                }
                else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retriving user with id" + id
                })
            })
    }
    else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message : err.message || "Error Occurred while retriving user information"});
        })
    }
}

// Update a new identified user
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data=> {
            if(!data){
                res.status(404).send({ message : `Cannot update user with ${id}. Maybe user not found`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message : "Error update user information"})
        })
}

// Delete a user with a specified user id
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot delete with ${id} maybe id is wrong`})
            }
            else{
                res.send({
                    message : "User deleted Successfully!!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message : "Could not delete User with id=" + id
            });
        });
}