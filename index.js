const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const PORT = process.env.PORT || 3001

//CONFIGURAÇÃO DO HANDLEBARS
app.engine('hbs', hbs.engine({
	extname: 'hbs',
	defaultLayout: 'main'
})); app.set('view engine', 'hbs')

//REFERENCIA CSS E JS
app.use(express.static('public'))

app.get('/', (req, res)=>{
	res.render('index', {NavActiveCard:true})
})

app.get('/users', (req, res)=>{
	res.render('users', {NavActiveUsers:true})
})

app.get('/editar', (req, res)=>{
	res.render('editar')
})

app.listen(PORT, ()=>{
	console.log(`Servidor rodando em http://localhost:${PORT}`)
})