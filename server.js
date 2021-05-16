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

const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }// Instruct the app
  // to use the forceSSL
  // middlewareapp.use(forceSSL());
  app.use(forceSSL());
  app.use(express.static(__dirname + '/dist/cawApp'));
  app.use('/user', userRoutes);
  app.use('/caw', cawRoutes);


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/cawApp/index.html'));
  });



mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://shashank:CawCaw@cawapp.tld43.mongodb.net/cawAppDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(
        result => {
            console.log('Mongodb Connected!');
            app.listen(process.env.PORT || 8080);
        }
    )
    .catch(err => console.log(err));