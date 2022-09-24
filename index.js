const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res)=>{
	res.send('Hello Word')
})

app.listen(PORT, ()=>{
	console.log(`Servidor rodando em http://localhost:${PORT}`)
})