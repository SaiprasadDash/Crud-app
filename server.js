const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({extended : true}))

app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, ""))

app.set("/css", express.static(path.resolve(__dirname, "assets/css")))
app.set("/js", express.static(path.resolve(__dirname, "assets/js")))
app.set("/img", express.static(path.resolve(__dirname, "assets/img")))

app.get('/', (req, res) =>{
    res.render('index.ejs');
});

app.listen(PORT, ()=> {
    console.log(`server is running on port http://localhost:${PORT}`);
});