import { v2 as cloudinary } from "cloudinary";
import itemsModel from '../models/itemsModel.js'


const addProduct = async (req, res) => {
	try {
		const placeNewOrder = await itemsModel.create({
			itemName: req.body.itemName,
			slug: req.body.slug,
			shortDesc: req.body.shortDesc,
			longDesc: req.body.longDesc,
			price: req.body.price,
			sale: req.body.sale,
			picture: req.body.picture,
			user_id: req.body.user_id,
			rate: req.body.rate,
			count: req.body.count,

		})

		res.status(200).json({
			msg: "Congratulations, the product was successfully published",
			alertColor: "success",
			order: placeNewOrder,

		});
	} catch (error) {
		res.status(400).json({
			msg: "Ouch! Something went wrong in the publication of the new product",
			alertColor: "error",
			error: error,
		});
	}
};


const uploadUserPicture = async (req, res) => {
	console.log("req.body", req.body);
	try {
		console.log("req.file", req.file);
		const uploadResult = await cloudinary.uploader.upload(req.file.path, {
			folder: "afm-mern-marketplace",
		});
		console.log("result", uploadResult);
		res.status(200).json({
			msg: "Avatar image has been successfully uploaded.",
			alertColor: "success",
			imageUrL: uploadResult.url,
		});
	} catch (error) {
		res
			.status(409).json({
				msg: "Avatar image has not been uploaded successfully",
				alertColor: "error",
				error: error,
			});
	}
};

const getAllItems = async (req, res) => {

	console.log(req)
	try {
		const data = await itemsModel.find({});
		res
			.status(200)
			.json({ data, Number: data.length })
	}
	catch (error) {
		res
			.status(400)
			.json({ message: "SERVER: itemsController.js -  Something went wrong with the JSON.", error: error });
	}
}

const getItemsBySlug = async (req, res) => {
	console.log(req.params)
	try {
		const data = await itemsModel
			.find({ slug: req.params.slug })

		if (data.length === 0) {
			res.status(201)
				.json({ Message: "The request does not return any results. Try to enter another parameter as 'Gender Code'" })
		} else {
			res.status(200)
				.json({ data, Number: data.length })
		}
	} catch (error) {
		res
			.status(400)
			.json({ message: "SERVER: itemsController.js -  Something went wrong with the JSON.", error: error });
	}
}












export { getAllItems, getItemsBySlug, addProduct, uploadUserPicture }