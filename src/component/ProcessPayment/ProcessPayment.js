import React from 'react';
import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from "./SimpleCardForm";

const ProcessPayment = () => {

    const stripePromise = loadStripe('pk_live_51Jto8OE2n6NqbabCFVi6WvT6XgzuVJBGX0prkVgRIkXXhgBYpumNJgUIOWlOKkg9muQoN79Ppu26TSg8QMqvDyq0006skeflT0');

    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <form>
                <CardElement></CardElement>
                <SimpleCardForm></SimpleCardForm>
                <button>Submit</button>
            </form>
        </Elements>
    );
};

export default ProcessPayment;