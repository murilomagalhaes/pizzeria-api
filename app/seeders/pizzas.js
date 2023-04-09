require('dotenv').config();
const model = require('../models/PizzaModel.js');


require('../config/database.js')().then(async () => {

    const pizzas = [
        { flavour: "Cheese", description: "Delicious cheese pizza", price: 19.99 },
        { flavour: "Pepperoni", description: "The best pepperoni pizza in town", price: 24.99 },
        { flavour: "Shredded Chicken", description: "Shredded chicken pizza", price: 29.99 },
    ];

    await Promise.all(pizzas.map(p => {
        return model.create(p);
    })).then(e => {
        console.log(`Pizzas seeded successfully`);
    }).catch(e => console.log(e));

    process.exit();

}).catch(e => console.log(e));