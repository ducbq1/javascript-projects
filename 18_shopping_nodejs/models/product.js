var mongoose = require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

var productSchema = new Schema({
    imagePath: { type: String, required: true },
    title: { type: String, require: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);