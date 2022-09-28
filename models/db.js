const Sequelize = require('sequelize')
const sequelize = new Sequelize('crud_nodehandlebars', 'root', '', {
	host: '127.0.0.1',
	dialect: 'mysql',
	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci',
		timestamps: true
	},
	logging: false
})

//TESTANDO A CONEXÃO COM O BANCO
// sequelize.authenticate().then( function (){
// 	console.log('Conectando no banco com sucesso!')
// }).catch(function(err){
// 	console.log('Falha ao se conectar: '+err)
// })

module.exports = {Sequelize, sequelize}