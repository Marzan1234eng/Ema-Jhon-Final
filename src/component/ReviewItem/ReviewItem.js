import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginLeft: '200px',
        paddingBottom: '5px',
        marginBottom: '5px'
    }
    return (
        <div>
            <div style={reviewItemStyle} className="review-item">
                <h3>{name}</h3>
                <p>Quantity: {quantity}</p>
                <p><small>$ {price}</small></p>
                <br/>
                <button
                    onClick={()=> props.removeProduct(key)}
                    className="main-button"
                >
                    Remove
                </button>
            </div>
        </div>

    );
};

export default ReviewItem;