const productsApi = require('./products');
const cartsApi = require('./carts');


module.exports = app => {
    productsApi(app);
    cartsApi(app);
    app.get('/', (req, res) => res.send('Hello world!'));
}