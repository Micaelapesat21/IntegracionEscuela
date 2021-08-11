// Import express
var express = require('express')
//Import Body Parser
var bodyParser = require('body-parser');
var cors = require('cors');
// Initialize the server express
var app = express();

//conectar BD
var urlBD='mongodb+srv://regiapp:regiapp@cluster0.z3gyq.mongodb.net/dbregiapp?retryWrites=true&w=majority';

 //opciones conexion
var opts = {useNewUrlParser : true, useUnifiedTopology: true,connectTimeoutMS:20000, useFindAndModify: false};
//importo driver
var mongoose = require('mongoose');
//Pruebo conexion
mongoose.connect(urlBD,opts).then(
    () => {
            console.log("Conectado!!");
          }, //se conecto
    err => { 
            console.log("ERROR:" + err); 
           } //manejo error
);
var corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Import router
var apiRoutes = require("./api-routes")


    // Todo lo que recibe la app se tratara como json
    app.use(bodyParser.urlencoded(
    {
        extended: true
    }));
    app.use(bodyParser.json());

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express in Integración de aplicaciones'));

// Use Api routes in the App
app.use('/regiapppfi2021', apiRoutes);


// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});

