const express = require('express');
const approutes = require('./routes');
const { PORT, APP_URL } = require('../src/config/server-config');
const { sequelize } = require('./models');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',approutes);


app.listen(PORT,async()=>{
    console.log("Server is running on PORT no:",PORT);
    console.log("Application URL is:",APP_URL);
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
});