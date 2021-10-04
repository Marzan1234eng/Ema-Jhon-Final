import React, {useState} from 'react';
import fakeData from "../../fakeData";
import '../Shop/Shop.css';
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {addToDatabaseCart} from "../../utilities/databaseManager";

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    /*product theke parameter peye setCart e add kore cart e props diye pass*/
    const handleAddProduct = (product) =>{
        //console.log("products clicked",product);
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter( pd => pd.key === products.key); //product e clcik korle j product pabe tar key er sathe newCart e joto gulo key math hobe tar count return korbe
        //console.log(sameProduct);
        const count = sameProduct.length; //j product er count return korbe tar length count e assign korlo
        addToDatabaseCart(products.key, count); // database e oi product er key & oi product koto gulo ache pass korbe
    };

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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;