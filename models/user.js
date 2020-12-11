const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	fullName: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	accessLevel: {
		type: String,
		required: true,
		default: 'user'
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	group: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Group'
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true
	},
	lastLogin: Date,

	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
})

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
		expiresIn: +process.env.JWT_EXPIRATION
	})

	user.tokens.push({ token })
	user.lastLogin = new Date()

	await user.save()

	return token
}

userSchema.methods.removeAuthToken = async function (token) {
	const user = this
	const tokens = user.tokens.filter(t => t.token !== token)
	user.tokens = tokens
	await user.save()
}

module.exports = mongoose.model('User', userSchema)
