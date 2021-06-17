const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const db = require("./models");
const app = express();


//app.use('/fichiers', express.static('fichiers'))
//app.use(cors());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
db.sequelize.sync({force:false}).then(()=>{
    console.log("excecuted")
})

app.get("/", function(req, res){
    res.send("welcome to my server");  
});

global.__basedir = __dirname;

app.use(cors(corsOptions));

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
var corsOptions = {
    origin: "http://localhost:8081"
  };


//require("./routes/auth.route")(app)
//require("./routes/auth.Cmdroute")(app)
//port sur lequel le server ecoute 
const port = 4026;
app.listen(port);
console.log("app is listenning on " + port)



