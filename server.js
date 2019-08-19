const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const port  = process.env.PORT || 5000;

mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
    console.log('Connected to mongodb...')
}).catch(err => {
    console.log(`Could not connect to mongdb... ${err}`)
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users/', require('./routes/users'));
app.use('/api/properties/', require('./routes/properties'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})