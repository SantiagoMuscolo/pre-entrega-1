const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'carrito.json');

class CartService {
    constructor() {
        this.carritos = [];
        this.path = FILE;

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '[]');
        }

        try {
            this.carritos = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        } catch (error) {
            this.carritos = [];
        }

        CartService.id = this.carritos.reduce((prev, curr) => (
            curr.id >= prev ? curr.id : prev
        ), 0);
    }

    async createCart(products) {
        try {
            const id = ++CartService.id;
            const newCart = {
                id,
                products: products
            };
    
            this.carritos.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2));
        } catch (error) {
            console.log(`[ERROR] -> ${error}`);
        }
    }
    

    async getProducts(cartId) {
        try {
            const cart = this.carritos.find(cart => cart.id === cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return cart.products;
        } catch (error) {
            console.log(`[ERROR] -> ${error}`);
        }
    }

    async addProduct(cartId, productId, products) {
        try {
            const cart = this.carritos.find(cart => cart.id === cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const existingProduct = cart.products.find(product => product.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const newProduct = {
                    id: productId,
                    ...products,
                    quantity: 1
                };
                

                cart.products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2));
                return newProduct;
            }
        } catch (error) {
            console.log(`[ERROR] -> ${error}`);
        }
    }
}

const cartService = new CartService();

module.exports = cartService;
