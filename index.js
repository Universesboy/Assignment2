const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
// MONGO DB CONNECTION
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect (dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({"message":"Successfull"});
});

require('./app/routes/note.routes.js')(app);

app.listen (4000,() => {
    console.log("Server is working");
})