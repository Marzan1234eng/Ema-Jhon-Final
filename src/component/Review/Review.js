import React, {useEffect, useState} from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import {Link} from "react-router-dom";

const Review = () => {
    const [cart, setCart] = useState([]);

    const handlePlaceOrder = () => {
        setCart();
        processOrder();
    }

    const removeProduct = (productKey) =>{
        //console.log("Remove Product",productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart); //database e j product gulo ache tader key return korbe
        /*const counts = productKeys.map( key => savedCart[key]); //j product gulo ache tader sobar alada alada count return korbe*/
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key]; /*product e product er quantity add korbe*/
            return product;
        }); //j product gulo ache tader sobar alada alada count return korbe
        //console.log(cartProducts);
        setCart(cartProducts);
    },[])
    //const total = cart.reduce((total, product) => total+product.quantity,0);

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}
                    >
                    </ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;