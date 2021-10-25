const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
})

userSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = doc._id.toString()
		delete obj._id
		delete obj.__v
	}
})

exports.User = model('User', userSchema)
