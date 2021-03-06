const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instrumentSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	model: String,
	probe: String,
	capacity: {
		type: Number,
		required: true
	},
	available: {
		type: Boolean,
		default: false
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true
	},

	status: {
		summary: {
			busyUntil: {
				type: String,
				default: 'unknown'
			},
			dayExpt: {
				type: String,
				default: 'unknown'
			},
			nightExpt: {
				type: String,
				default: 'unknown'
			},
			running: Boolean,
			availableHolders: Number,
			errorCount: Number,
			pendingCount: Number
		},
		statusTable: {
			type: Array,
			default: []
		},
		historyTable: {
			type: Array,
			default: []
		}
	}
})

module.exports = mongoose.model('Instrument', instrumentSchema)
