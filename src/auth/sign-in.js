'use strict'
const express = require('express')
const app = express
const bcrypt = require('bcrypt')
const base64 = require('base-64')
const {Auth} = require('../models/index')

const getSignIn = async (req, res,next) => {

    const encodedHeaders = req.headers.authorization.split(' ')[1];
    const [username, password] = base64.decode(encodedHeaders).split(':')

    const user = await Auth.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        res.status(200).json(user);
      } else {
        res.status(403).json({ 'error': 'username or password incorrect!' })
      }
    next();
    
    }


      module.exports=getSignIn;