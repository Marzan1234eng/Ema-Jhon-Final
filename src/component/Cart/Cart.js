import React from 'react';
import {Link} from "react-router-dom";

const Cart = (props) => {
    const cart = props.cart;
    /*const total = cart.reduce((total,pd) => total + pd.price,0);*/

    let productPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        productPrice = Math.round(productPrice + product.price * product.quantity || 1);
    }

    let shipping = 0;
    if (productPrice > 35){
        shipping = 0;
    }
    else if(productPrice > 15){
        shipping = 4.99;
    }
    else if (productPrice > 0){
        shipping = 12.99
    }

    const tax = Math.round(productPrice / 10);
    const grandTotal = Math.round(productPrice + shipping + tax);
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {productPrice}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p>Total: {grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;