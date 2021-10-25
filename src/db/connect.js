require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose
	.connect(url)
	.then((res) => console.log('Conectado'))
	.catch((e) => console.log(e))
