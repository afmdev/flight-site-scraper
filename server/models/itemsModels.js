import mongoose from 'mongoose'
const { Schema } = mongoose;

const itemsSchema = new mongoose.Schema({
	itemName: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		unique: true
	},
	shortDesc: {
		type: String,
	},
	longDesc: {
		type: String,
	},
	flightFrom: {
		type: String,
	},
	flightTo: {
		type: String,
	},
	dealPrice: {
		type: String,
	},
	picture: {
		type: String,
	},
	dealPrice: {
		type: String,
	}

});

const itemsModel = mongoose.model('item', itemsSchema);

export default itemsModel
