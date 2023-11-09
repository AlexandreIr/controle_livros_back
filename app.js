const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3001;
const books=require('./books');
app.use(express.json());
app.use('/books', books);

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})