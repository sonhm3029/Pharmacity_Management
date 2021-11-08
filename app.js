const express = require('express');
const app = express();

const path = require('path');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes/index');
const methodOverride = require('method-override');
const exp = require('constants');
const router = require('./routes/login');

const port = process.env.PORT || 3000;


app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

route(app);


app.listen( port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})
