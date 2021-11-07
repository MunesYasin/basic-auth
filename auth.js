'use strict'

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');

const app = express()


app.use(express.json()); // parse the request body from the payload

// process FORM input with the basic Authentication in it/ prase it into the req.body
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize('postgres://localhost:5432/auth')

const Users = sequelize.define('user',{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
})


app.post('/sing-up',async (req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const record = await Users.create(req.body);
    res.status(201).json(record);
})

app.post('/sign-in', async (req, res) => {

    const encodedHeaders = req.headers.authorization.split(' ')[1];
    const [username, password] = base64.decode(encodedHeaders).split(':')

    const user = await Users.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        res.status(200).json(user);
      } else {
        res.status(500).json({ 'error': 'username or password incorrect!' })
      }})