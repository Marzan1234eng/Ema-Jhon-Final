import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import './shipment.css';
import {UserContext} from "../../App";

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);
    console.log("hello",loggedInUser);
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