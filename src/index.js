require('./db/connect')
require('dotenv').config()

// ...
const express = require('express')
const app = express()
const cors = require('cors')

// ...
const userCtrl = require('./controller/userController')

const PORT = 3001 || process.env.PORT

// ...
app.use(cors())
app.use(express.json())

// Error Handler
const errorHandler = (error, request, response, next) => {
	console.error(error.name)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'Formato incorrecto' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

// Rutas
app.post('/api/user', userCtrl.create)
app.get('/api/user', userCtrl.getAll)
app.get('/api/user/:id', userCtrl.getUserById)
app.delete('/api/user/:id', userCtrl.deleteById)
app.put('/api/user/:id', userCtrl.updateById)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`SERVER RUNNING IN PORT ${PORT}`)
})
