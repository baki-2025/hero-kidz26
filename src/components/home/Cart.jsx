"use client";
import React, { useState } from 'react';
import CartItem from '../cards/CartItem';

const Cart = ({cartItem=[]}) => {
    const [items, setItems] = useState(cartItem);
    return (
        <div>
            <p className='py-3'>
        <span className='text-primary font-bold'> 
         {items.length}
        </span>{" "}
        Items 
        Found in the Cart
       </p>
           <div className='flex'>
        <div className='flex-3 space-y-4'>
          {
            items.map((item) => (
            <CartItem key={item._id} item={item}></CartItem>
          ))}
        </div>
        <div className='flex-1'></div>
      </div> 
        </div>
    );
};

export default Cart;