
'use strict'

const express = require('express')
const app = express()



const PORT = 3000
const singup = require('./auth/sign-up')
const signin = require('./auth/sign-in')
const notFoundHandler = require('./error-handler/404')
const errorHandler = require('./error-handler/500')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send(' Welcome')
  })


app.post('/sing-up',singup,(req,res,next)=>{
    res.status(201).json(req.body)
})

app.post('/sing-in',signin,(req,res,next)=>{
})

app.use('*', notFoundHandler);

app.use(errorHandler);

function start(){
    app.listen(PORT,()=>{
        console.log('SERVER STARTED')
    })}
    
    module.exports={
        app,
        start,
    };