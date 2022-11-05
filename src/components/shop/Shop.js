import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

/* count :loaded
perPage content:10
pages: count/perPage
currentPage

*/

const Shop = () => {

    // const { products } = useLoaderData();
    // const productData = useLoaderData();
    // const { products, count } = productData;
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size])

    const pages = Math.ceil(count / size);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        // console.log(storedCart);
        const savedCart = [];
        const ids = Object.keys(savedCart);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {

                for (const id in storedCart) {
                    const addedProducts = data.find(product => product._id === id);
                    // console.log(addedProducts);
                    if (addedProducts) {
                        const quantity = storedCart[id];
                        addedProducts.quantity = quantity;
                        savedCart.push(addedProducts);
                    }
                    // console.log(addedProducts);
                    setCart(savedCart);
                }
            })

    }, [products])

    const addToCart = (product) => {

        let newCart = [];

        const exists = cart.find(p => p._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            const rest = cart.filter(p => p._id !== product._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(product._id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product._id} product={product}
                        addToCart={addToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to={'/orders'}>
                        <button>Review Items</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <p>Currently selected page: {page}</p>
                {
                    [...Array(pages).keys()].map(num => <button
                        key={num}
                        className={page === num && 'selected'}
                        onClick={() => setPage(num)}
                    >
                        {num + 1}
                    </button>)
                }
                <select onChange={(event) => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;