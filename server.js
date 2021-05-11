const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./backend/routes/user.routes')
const cawRoutes = require('./backend/routes/caw.routes')


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/user', userRoutes);
app.use('/caw', cawRoutes);

mongoose.connect("mongodb+srv://shashank:CawCaw@cawapp.tld43.mongodb.net/cawAppDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(
        result => {
            console.log('Mongodb Connected!');
            app.listen(3000);
        }
    )
    .catch(err => console.log(err));