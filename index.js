const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greet')


const app = express();

const greeting = Greetings();


// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {




    res.render("index", {
        getMsg: greeting.greetMsg(),
        counter: greeting.numberOfGreetedNames()
    })
});

app.post('/greetUser', function (req, res) {
    let nameInput = req.body.name;
    let selectedLang = req.body.languageName;
    greeting.greet(nameInput, selectedLang)


    res.redirect('/');
});

app.post('/action', function (req, res) {


    res.redirect('/')
})


const PORT = process.env.PORT || 3021;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})