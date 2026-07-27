"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems }) => {
  const session = useSession();
  const router = useRouter();
  
  

const totalItems = useMemo(
 ()=> cartItems.reduce((sum,item)=> sum + item.quantity, 0),
 [cartItems]
);

const totalPrice = useMemo(
 ()=> cartItems.reduce((sum,item)=> sum + item.quantity * item.price, 0),
 [cartItems]
);


  

  const handleSubmit = async(e) => {
    e.preventDefault();

    const form = e.target;
    const payload = {
       name:form.name.value,
       email:form.email.value,
       contact:form.contactNo.value,
       address:form.deliveryInfo.value,
       instruction:form.specialInstruction.value,
    }

    const result = await createOrder(payload);

    if(result.success){
    Swal.fire("success","Order added", "success");
    router.push("/");
    } else{
      Swal.fire("error", "Something went wrong", "error");
      router.push("/cart");
    }
    
  };

  if(session.status=="loading"){
    return <h2>Loading.. </h2>;
  }

  return (
  <div className="max-w-7xl mx-auto px-4 py-10">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left Side - Delivery Information */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg  p-8">
          <h2 className="text-3xl text-center font-bold mb-6">
            Delivery Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Full Name */}
  <div>
    <label className="label">
      <span className="label-text font-medium">
        Full Name
      </span>
    </label>
    <input
      type="text"
      name="name"
      value={session?.data?.user?.name}
      //onChange={handleChange}
      placeholder="Enter your full name"
      className="input input-bordered w-full"
      required
      readOnly
    />
  </div>

  {/* Email */}
  <div>
    <label className="label">
      <span className="label-text font-medium">
        Email
      </span>
    </label>
    <input
      type="email"
      name="email"
      value={session?.data?.user?.email}
      
      placeholder="example@email.com"
      className="input input-bordered w-full"
      required
      readOnly
    />
     </div>
     </div>

            {/* Contact */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Contact Number
                </span>
              </label>
              <input
                type="tel"
                name="contactNo"
               
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Delivery Address
                </span>
              </label>
              <textarea
                rows={4}
                name="deliveryInfo"
               
                placeholder="House No, Road, Area, District..."
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            {/* Special Instruction */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Special Instruction
                </span>
              </label>
              <textarea
                rows={3}
                name="specialInstruction"
               
                placeholder="Optional (Call before delivery)"
                className="textarea textarea-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              CheckOut With Cash On Delivery
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
          <h2 className="text-2xl text-center font-bold mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-start border-b pb-3"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
};

export default CheckOut;