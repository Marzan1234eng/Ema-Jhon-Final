import React, {useEffect, useState} from 'react';
import fakeData from "../../fakeData";
import '../Shop/Shop.css';
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {addToDatabaseCart, getDatabaseCart} from "../../utilities/databaseManager";
import {Link} from "react-router-dom";

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingkey => {
            const product = fakeData.find(pd => pd.key === existingkey);
            product.quantity = savedCart[existingkey];
            return product;
        })
        console.log(products);
        setCart(previousCart);
    },[])

    /*product theke parameter peye setCart e add kore cart e props diye pass*/
    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find( pd => pd.key === toBeAddedKey);

        let count = 1;
        let newCart;
        if (sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        /*const sameProduct = newCart.filter( pd => pd.key === product.key); //product e clcik korle j product pabe tar key er sathe newCart e joto gulo key math hobe tar count return korbe
        const count = sameProduct.length; //j product er count return korbe tar length count e assign korlo*/
        addToDatabaseCart(product.key, count); // database e oi product er key & oi product koto gulo ache pass korbe
    };

    //console.log(products);

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd =>
                        <Product
                            key={pd.key}
                            showAddToCart={true}
                            product={pd}
                            handleAddProduct={handleAddProduct}
                        >

                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;