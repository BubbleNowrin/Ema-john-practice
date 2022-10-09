import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({ product, handleReviewItem }) => {
    const { id, name, price, quantity, img, shipping } = product;
    return (
        <div className='review-items-container'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='review-item-details'>
                <div>
                    <p>Name: {name}</p>
                    <p><small>Price: {price}</small></p>
                    <p><small>Shipping: ${shipping}</small></p>
                    <p><small>Quantity: {quantity}</small></p>
                </div>
                <div className='dlt-container'>
                    <button onClick={() => handleReviewItem(id)} className='btn-delete'>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ReviewItem;