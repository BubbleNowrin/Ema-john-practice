import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css'

const Product = (props) => {

    const { name, img, seller, price, ratings } = props.product;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <p className='product-name'>{name}</p>
            <div className='product-info'>

                <p><b>${price}</b></p>
                <p><small>{seller}</small></p>
                <p><small>{ratings} stars</small></p>
            </div>
            <button onClick={() => props.addToCart(props.product)} className='btn'>
                <p className='btn-text'>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>

        </div>
    );
};

export default Product;