const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greet')
const flash = require('express-flash');
const session = require('express-session');
// const greetingRoute = require('')


// var nameToGreet = req.body.name
// var languageChosen = req.body.languageName


const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/testdb';

const pool = new Pool({
    connectionString
});


const app = express();

const greeting = Greetings(pool);

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

app.get('/', async function (req, res) {
    res.render("index", {
        counter: await greeting.numberOfGreetedNames(),
        getMsg: await greeting.greetMsg()

    })
});

app.post('/greetUser', async function (req, res) {
    let nameInput = req.body.name;
    console.log('name Input', nameInput)
    let selectedLang = req.body.languageName;

    let alrdyGreeted = greeting.nameList()

    // for (i in alrdyGreeted) {
    //     console.log(alrdyGreeted)

    // if (nameInput) {
    //     req.flash('errorMsg', 'dddddd')
    // }
    
    if (req.body.resetButton === 'Reset') {
        await greeting.resetData()
    } else {
        if (nameInput === undefined || nameInput === "") {
            req.flash('errorMsg', 'Enter a name')
        } else if (selectedLang === undefined || selectedLang === "") {
            req.flash('errorMsg', 'select a Language for greeting')
        } else {
            await greeting.greet(nameInput, selectedLang)
            // req.flash('getMsg', greeting.greetMsg())
            greeting.greetMsg()

            if (greeting.errorMSG()) {
                req.flash('errorMsg', greeting.errorMSG())
            }
        }
    }

    res.redirect('/');
});
app.get('/the-route', async function (req, res) {

    await greeting.numberOfGreetedNames(nameToGreet, languageChosen)
    if (nameToGreet === "") {
        req.flash('info', 'Enter a name');
    }

    req.flash('info', 'Flash Message Added');

    res.redirect('/');
});

app.get('/action', async function (req, res) {
    res.render('actions', {
        actions: await greeting.finalTable()
    })

})
app.get('/counter/:id', async function (req, res) {
    let name = req.params.id
    //   console.log(name);

    res.render('counter', {
        counter: await greeting.perName(name),
        name: name
    })
});

app.post('/backHome', async function (req, res) {
    res.redirect('/')
});

app.post('/backToTable', async function (req, res) {
    res.redirect('/action')
});


const PORT = process.env.PORT || 3023;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})