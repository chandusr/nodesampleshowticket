const bodyParser = require("body-parser");
var express = require("express");
const { initDb } = require("./mongodbConnection");
app = express();
port = process.env.port || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/show",require('./router/showRouter'));

app.use((req,res,next)=>{
    res.header("Access-Controll-Allow-Origin","*");
    res.header("Access-Conroll-Allow-Methods","GET,POST,PUT,DELETE,PATCH,OPTIONS");
})

initDb().then(()=>{
    app.listen(port,(err,res)=>{
        if (!err) {
            return console.log(`server listening on port${port}`);
        }
    });
})
.catch(err=>{
    console.log("db connection failed");
})






