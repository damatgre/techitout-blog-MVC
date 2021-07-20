const express = require('express');
//packaged endpoints
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting path to use public files both css and js
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//turn on routes
app.use(routes);

//turn on connection to db and server
//sync takes models and connects them to associated database tables
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});