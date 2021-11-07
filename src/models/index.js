'use strict'


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL

const {Sequelize,DataTypes}= require('sequelize')

let sequelizeOption = process.env.NODE_ENV === 'production '? {
dialectOptions :{
    ssl :{
        require : true ,
        rejectUnauthorized : false,
    }
}
} :{}


 const auth = require('./authModel')


let sequelize = new Sequelize(POSTGRES_URI,sequelizeOption)
module.exports = {
    db:sequelize,
    Auth : auth(sequelize,DataTypes),
   
}