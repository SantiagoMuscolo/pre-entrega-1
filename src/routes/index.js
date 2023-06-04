const productsApi = require('../components/products')


module.exports = app => {
    productsApi(app)
    app.get('/', (req, res) => res.send('ok'));

    // app.use((error, req, res, next) => {
    //     console.error(error.stack);
    //     res.status(500).send("Algo salio mal")
    // })
}