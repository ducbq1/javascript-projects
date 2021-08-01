var Product = require('../models/product');

var mongoose = require('mongoose');

var products = [
    new Product({
        imagePath: 'https://images.wallpaperscraft.com/image/quad_bike_rover_cross_202024_1280x720.jpg',
        title: 'Awesome Picture',
        description: 'So Cool',
        price: '100'
    }),
    new Product({
        imagePath: 'https://images.wallpaperscraft.com/image/quad_bike_rover_cross_202024_1280x720.jpg',
        title: 'Awesome Picture',
        description: 'So Cool',
        price: '100'
    }),
    new Product({
        imagePath: 'https://images.wallpaperscraft.com/image/quad_bike_rover_cross_202024_1280x720.jpg',
        title: 'Awesome Picture',
        description: 'So Cool',
        price: '100'
    }),
    new Product({
        imagePath: 'https://images.wallpaperscraft.com/image/quad_bike_rover_cross_202024_1280x720.jpg',
        title: 'Awesome Picture',
        description: 'So Cool',
        price: '100'
    })
];

async function run() {
    try {
        await mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true, useUnifiedTopology: true });
        for (var i = 0; i < products.length; i++) {
            await products[i].save();
        }
    } finally {
        await mongoose.disconnect();
    }
}

run().catch(console.dir);
