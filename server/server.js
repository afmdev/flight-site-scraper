import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'

import { cloudinaryConfig } from './config/cloudinaryConfig.js'

import passportConfig from './config/passport.js'
import passport from 'passport'

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

const startServer = () => {
	app.listen(port, () => {
		console.log("|-->>>>>>> The backend server is running on port " + port + " <<<<<<<--|")
	})
}

const loadRoutes = () => {
	app.use("/api/categories", categoriesRoute)
	app.use("/api/genders", gendersRoute)
	app.use("/api/items", itemsRoute)
	app.use("/api/users", usersRoute)
	app.use("/api/carts", cartsRoute)
	app.use("/api/orders", ordersRoute)
}

const addMiddleware = () => {
	app.use(express.json())
	app.use(
		express.urlencoded({
			extended: true,
		})
	)
	const corsOptions = {
		origin: '*',
		credentials: true,
		//access-control-allow-credentials:true
		optionSuccessStatus: 200,
	}
	app.use(cors(corsOptions))
	cloudinaryConfig()

	app.use(passport.initialize())
	passportConfig(passport)
}

const mongoDbConection = async () => {
	try {
		await mongoose.connect(process.env.DB)
		console.log("|-->>>>>> The connection to MongoDB has been successful <<<<<--| ")
	} catch (error) {
		console.log("ERROR: fail connecting to Mongo DB", error)
	}
}

(async () => {
	await mongoDbConection()
	// addMiddleware()
	// loadRoutes()
	startServer()
})()