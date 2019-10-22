const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greet')
const flash = require('express-flash');
const session = require('express-session');
// const greetingRoute = require('')


// var nameToGreet = req.body.name
// var languageChosen = req.body.languageName


const app = express();

const greeting = Greetings();

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


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
        counter: greeting.numberOfGreetedNames(),
        getMsg: greeting.greetMsg()
    })
});

app.post('/greetUser', function (req, res) {
    let nameInput = req.body.name;
    console.log('name Input', nameInput)
    let selectedLang = req.body.languageName;
    if (nameInput === undefined || nameInput === "") {
        console.log("dfg")
        req.flash('errorMsg', 'Enter a name')
    } else if (selectedLang === undefined || selectedLang === "") {
        req.flash('errorMsg', 'select a Language for greeting')
    } else {
        greeting.greet(nameInput, selectedLang)
        // req.flash('getMsg', greeting.greetMsg())
        greeting.greetMsg()
    }




    res.redirect('/');
});
app.get('/the-route', function (req, res) {

    greeting.numberOfGreetedNames(nameToGreet, languageChosen)
    if (nameToGreet === "") {
        req.flash('info', 'Enter a name');
    }

    req.flash('info', 'Flash Message Added');

    res.redirect('/');
});

app.post('/action', function (req, res) {


    res.redirect('/')
})


const PORT = process.env.PORT || 3021;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})