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
	price: {
		type: String,
	},
	sale: {
		type: Number,
	},
	rate: {
		type: Number,
	},
	picture: {
		type: String,
	},
	user_id: [{
		type: String,
	}],

});

const itemsModel = mongoose.model('item', itemsSchema);

export default itemsModel
