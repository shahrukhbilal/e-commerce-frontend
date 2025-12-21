import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from './pages/CheckoutPage'

const stripePromise= loadStripe('pk_test_51RoGpsD8gLNGf7lEX3cueBG5m8803bAo5Qp5Rtn5ERSJkd3ikc8nA5CMFSWHbxL7vfeZWOg5Ae3EuCxUB28EEq7800pH8jumuZ');

const StripeContainer= ()=>{
    return (
        <Elements stripe= {stripePromise}>
            <CheckoutPage></CheckoutPage>
        </Elements>
    )
}

export default StripeContainer;