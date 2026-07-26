"use client";
import React, { useMemo, useState } from 'react';
import CartItem from '../cards/CartItem';

const Cart = ({cartItem=[]}) => {
    const [items, setItems] = useState(cartItem);

    const totalItems = useMemo(()=>items.reduce((sum,item) => sum + item.quantity, 0),[items]
  );

   const totalPrice = useMemo(()=>items.reduce((sum,item) => sum + item.price * item.quantity, 0),[items]
  );

  const removeItem = (id) => {
      setItems(prevItems => prevItems.filter((item) => item._id!= id))
  };

  const updateQuantity = (id,q) => {
   setItems((prevItems) => prevItems.map(item => item._id == id? {...item, quantity: q }: item

   )
  );
};
   return (
  <div>
    <p className="py-3">
      <span className="text-primary font-bold">{items.length}</span> Items Found
      in the Cart
    </p>

    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Side */}
      <div className="lg:w-2/3 space-y-4">
        {items.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>

      {/* Right Side - Summary */}
      <div className="lg:w-1/3">
        <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-5">
          <h2 className="text-2xl font-bold border-b pb-3 mb-4 text-center">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-3"
              >
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <div className="flex justify-between text-sm mt-2">
                  <span>Quantity</span>
                  <span>{item.quantity}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Price</span>
                  <span>{item.price}</span>
                </div>

                <div className="flex justify-between font-semibold text-primary">
                  <span>Total</span>
                  <span>{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-5" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Products</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Grand Total</span>
              <span>{totalPrice}</span>
            </div>
          </div>

          <button
            className="btn btn-primary w-full mt-6"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Cart;