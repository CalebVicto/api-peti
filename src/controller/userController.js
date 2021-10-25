const { User } = require('../model/userModel')

const create = (req, res) => {
	const data = req.body

	if (data === undefined) {
		return res.status(400).json({ error: 'Campos vacios!!!' })
	}

	const user = new User({
		name: data.name,
		last_name: data.last_name,
		email: data.email,
		password: data.password
	})

	user
		.save()
		.then((data) => {
			res.json(data)
		})
		.catch((e) => {
			console.log(e)
		})
}

const getAll = (req, res) => {
	User.find({}).then((data) => {
		res.json(data)
	})
}

const getUserById = (req, res, next) => {
	User.findById(req.params.id)
		.then((data) => {
			data ? res.json(data) : res.status(404).end()
		})
		.catch((e) => next(e))
}

const deleteById = (req, res, next) => {
	User.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(404).end()
		})
		.catch((e) => next(e))
}

const updateById = (req, res, next) => {
	const data = req.body
	const user = {
		name: data.name,
		last_name: data.last_name,
		email: data.email,
		password: data.password
	}
	User.findByIdAndUpdate(req.params.id, user, { new: true })
		.then((result) => {
			res.json(result)
		})
		.catch((e) => next(e))
}

module.exports = { create, getAll, getUserById, deleteById, updateById }
