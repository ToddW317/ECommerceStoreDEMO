import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear out any existing data in the database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert the users from the users.js file into the database
        const createdUsers = await User.insertMany(users);

        // Get the admin user from the database
        const adminUser = createdUsers[0]._id;

        // Add the admin user to each product
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Insert the products from the products.js file into the database
        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        // Clear out any existing data in the database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

// If the command line argument is '-d', destroy the data in the database
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}


