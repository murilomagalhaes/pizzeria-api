require('dotenv').config();
const model = require('../models/UserModel.js');

require('../config/database.js')().then(async () => {

    let admin = await model.create({
        name: "System Administrator",
        email: "admin@admin.com",
        password: "admin",
        isAdmin: true
    });

    console.log(`User '${admin.name}' created successfully`);

    process.exit();

}).catch(e => console.log(e));