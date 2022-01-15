const express = require('express');
const app = express();

const path = require('path');
// const handlebars = require('express-handlebars');
const handlebars_helper = require('./helper/handlebar.helper');

// const morgan = require('morgan'); commnent morgan before deploy to heroku

const route = require('./routes/index');
const methodOverride = require('method-override');
const exp = require('constants');
const router = require('./routes/login');

const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;

// Import database and connect
const db = require('./config/db/index');
db.connect();


// app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// app.engine('hbs', handlebars({
//     extname: '.hbs'
// }));

// app.set('view engine', 'hbs');
handlebars_helper(app);
route(app);


app.listen( port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})
