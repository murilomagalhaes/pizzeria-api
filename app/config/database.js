const mongoose = require('mongoose');

module.exports = () => {
    
    const mongodb_uri = process.env.MONGODB_URI;
    console.info(`Trying to connect to MongoDB on ${mongodb_uri}`);
    
    return mongoose.connect(mongodb_uri);
}