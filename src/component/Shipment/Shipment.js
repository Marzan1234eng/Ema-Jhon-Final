import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import './shipment.css';
import {UserContext} from "../../App";
import {getDatabaseCart, processOrder} from "../../utilities/databaseManager";

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};

        fetch("https://stormy-harbor-62507.herokuapp.com/addOrder",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data){
                    processOrder();
                    alert('your order placed successfully');
                }
            })
    }

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={loggedInUser.name} name="name" placeholder="Your Name" {...register("name", { required: true })} />
            {errors.name && <span className="error">Name is required</span>}

            <input defaultValue={loggedInUser.email} name="email" placeholder="Your Email" {...register("email", { required: true })} />
            {errors.email && <span className="error">Email is required</span>}

            <input placeholder="Your Address" name="address" {...register("address", { required: true })} />
            {errors.address && <span className="error">Address is required</span>}

            <input placeholder="Your Phone" name="phone" {...register("phone", { required: true })} />
            {errors.phone && <span className="error">Phone Number is required</span>}
            <input type="submit" />
        </form>
    );
};

export default Shipment;