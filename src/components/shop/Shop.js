import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getStoredCart();
        // console.log(storedCart);
        const savedCart = [];
        for (const id in storedCart) {
            const addedProducts = products.find(product => product.id === id);
            // console.log(addedProducts);
            if (addedProducts) {
                const quantity = storedCart[id];
                addedProducts.quantity = quantity;
                savedCart.push(addedProducts);
            }
            // console.log(addedProducts);
            setCart(savedCart);
        }
    }, [products])

    const addToCart = (product) => {

        let newCart = [];

        const exists = cart.find(p => p.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            const rest = cart.filter(p => p.id !== product.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product}
                        addToCart={addToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;