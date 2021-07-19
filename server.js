const express = require('express');
//packaged endpoints
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(routes);

//turn on connection to db and server
//sync takes models and connects them to associated database tables
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});