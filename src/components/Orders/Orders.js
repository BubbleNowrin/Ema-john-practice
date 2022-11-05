import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const { products, initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const handleReviewItem = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItem key={product._id} product={product} handleReviewItem={handleReviewItem}></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>No items to review. Please<Link to={'/'}>Shop More</Link></h2>
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/shipping'>
                        <Link to={'/shipping'}><button>Proceed Shipping</button></Link>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders; <h2>This is orders</h2>