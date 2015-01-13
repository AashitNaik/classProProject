var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var path = require('path');

//User model
var app = express();
var usersController = require('./controllers/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html');
app.engine('html', hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended:false
    }));
app.use(express.static('public'));


//Routes
app.get('/', function (request, response) {

    response.render('index', {
        title: "Home",
        users: usersController.getUsers
    });
});

app.get('/users/:id', function (request, response) {

    var user = usersController.getUser(request.params.id);
    response.render('profile', {
        title: "User Profile",
        user: user
    });
});

app.get('/about', function (request, response) {

    response.render('about', {
        title:'about'
    });
});
app.get('/login', function (request, response) {

    response.render('login', {
        title: 'Login'
    });
});

app.post('/login', usersController.postLogin);

app.get('/signup', function (request, response) {
    response.render('signup',{
        title:"SignUp"
    });
});

app.listen(3000);