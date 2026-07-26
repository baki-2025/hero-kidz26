"use client";
import React, { useMemo, useState } from 'react';
import CartItem from '../cards/CartItem';

const Cart = ({cartItem=[]}) => {
    const [items, setItems] = useState(cartItem);
    const totalItems = useMemo(()=>items.reduce((acm,item) => acm + item.quantity, 0),[items]
  );

  const removeItem = (id) => {
      setItems(prevItems => prevItems.filter((item) => item._id!= id))
  };
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
            <CartItem key={item._id} item={item}
            removeItem={removeItem}
            ></CartItem>
          ))}
        </div>
        <div className='flex-1 text-center'>{totalItems}</div>
      </div> 
        </div>
    );
};

export default Cart;