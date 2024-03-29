//create and save a new Todo
exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Todo content cannot be empty"
        });
    }
// Create a Todo
    const todo = new Todo({
        name:req.body.name || "Untitled Todo",
        description: req.body.description,
    });
// Save Todo in the database
    todo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send ({
            message: err.message || "Some error occurred while creating the Todo"
        });
    });
};

// Retrieve and return all todos from the database
exports.findAll = (req, res) => {
    Todo.find()
    .then(todos => {
        res.send(todos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos"
        });
    });
};

Todo.findById(id).then(todo => {    
    if(!todo) {
        res.status(400).send({
            'message':'Todo not avaliable!'
        }
        )
    }
    res.send(todo);
}).catch(err => {
    res.status(500).send({
        'message':'Something Error',
        'error':err
    })
})




//Find a single todo with a id
exports.findOne = (req, res) => {
    Todo.findById(req.params.id)
    .then(todo => {
        if (!todo) {
            return res.status(404).send ({
                message: "Todo not found with id " + req.params.id
            });
        }
        return res.status(500).send ({
            message: "Error retrieving todo with id " + req.params.id
        });
    });
};

 
// Update a todo identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send ({
            message: "Todo content cannot be empty"
        });
    }

    // Find todo and update it with the request body

    Todo.findByIdAndUpdate(req.params.id, {
        title:req.body.name || "Untitled Todo",
        description: req.body.description,
    }, {new: true})
    .then(todo => {
        if (!todo) {
            return res.status(404).send ({
                message: "Todo not found with id " + req.params.id
            });
        }
        res.send(todo);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send ({
                message: "Todo not found with id " + req.params.id
            });
        }
        return res.status(500).send ({
            message: "Error updating todo with id " + req.params.id
        });
    });
};


// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
       res.send({'message': "Todo deleted successfully!"})
    }).catch(err => {
        res.status(500).send ({
            'message': "Could not delete todo with id " ,
            'error': err
        })
    })
};




