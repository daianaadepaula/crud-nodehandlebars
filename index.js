const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT || 3001

//CONFIGURAÇÃO DO HANDLEBARS
app.engine('hbs', hbs.engine({
	extname: 'hbs',
	defaultLayout: 'main'
})); app.set('view engine', 'hbs')

//REFERENCIA CSS E JS / BODYPARSER
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

//CONFIGURAÇÃO DAS SESSIONS
app.use(session({
	secret: 'CriarUmaChaveQualquer1234!',
	resave: false,
	saveUninitialized: true
}))


app.get('/', (req, res)=>{
	if(req.session.erros){
		let arrayErros = req.session.erros
		req.session.erros = ""
		return res.render('index', {NavActiveCard:true, error: arrayErros})
	}

	if(req.session.success){
		req.session.success = false
		return res.render('index', {NavActiveCard:true, MsgSuccess: true})
	}

	res.render('index', {NavActiveCard:true})
})

app.get('/users', (req, res)=>{
	res.render('users', {NavActiveUsers:true})
})

app.get('/editar', (req, res)=>{
	res.render('editar')
})

app.post('/cad', (req, res)=>{
	//VALORES VINDOS DO FORMULÁRIO
	let nome = req.body.nome;
	let email = req.body.email;

	//ARRAY QUE VAI CONTER OS ERROS
	const erros = []

	//REMOVER OS ESPAÇOS EM BRANCO ANTES E DEPOIS
	nome = nome.trim()
	email = email.trim()

	//LIMPAR O NOME DE CARACTERES ESPECIAIS (APENAS LETRAS)
	nome = nome.replace(/[^A-zÀ-ú\s]/gi, '')

	//VERIFICAR SE ESTÁ VAZIO OU NÃO CAMPO
	if (nome == '' || typeof nome == undefined || nome == null){
		erros.push({mensagem: "Campo nome não pode ser vazio!"})
	}

	//VERIFICAR SE O CAMPO NOME É VÁLIDO (APENAS LETRAS)
	if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)){
		erros.push({mensagem: "Nome inválido!"})
	}

	//VERIFICAR SE ESTÁ VAZIO OU NÃO CAMPO
	if (email == '' || typeof email == undefined || email == null){
		erros.push({mensagem: "Campo email não pode ser vazio!"})
	}

	//VERIFICAR SE EMAIL É VÁLIDO
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
		erros.push({mensagem: "Campo email inválido!"})
	}

	if(erros.length > 0){
		console.log(erros)
		req.session.erros = erros
		req.session.success = false
		return res.redirect('/')
	}

	//SUCESSO NENHUM ERRO
	//SALVAR NO BANCO DE DADOS
	console.log('Validação realizada com sucesso!')
	req.session.success = true
	return res.redirect('/')

})

app.listen(PORT, ()=>{
	console.log(`Servidor rodando em http://localhost:${PORT}`)
})