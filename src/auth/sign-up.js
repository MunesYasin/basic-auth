'use strict'
const express = require('express')
const app = express

const bcrypt = require('bcrypt')
const {Auth} = require('../models/index')








const getSignUp =async (req,res,next)=>{
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const record = await Auth.create(req.body);
    next();
}

module.exports=getSignUp;