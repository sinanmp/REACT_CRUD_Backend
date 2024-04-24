const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://sinan:1234@cluster0.0rrs8cz.mongodb.net/CRUD');
        console.log(`MongoDB connected ${connect.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;
