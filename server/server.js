require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT;

//Llamar la DB MONGO
const connectMongo = require('./config/mongoDb');
connectMongo();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(`/api`, require('./routes/products.routes'));

app.listen(PORT, ()=>{
    console.log(` 1 : The server is lock and loading at PORT: ${PORT}`);
});

