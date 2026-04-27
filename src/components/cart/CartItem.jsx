"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { updateCartQuantity, removeFromCart } from "@/actions/server/cart";
import Swal from "sweetalert2";
import { useState } from "react";

const CartItem = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
  const quantity = item.quantity || 1;
  const totalPrice = discountedPrice * quantity;

  const handleIncrease = async () => {
    setLoading(true);
    const res = await updateCartQuantity(item._id.toString(), "increase");
    if (!res.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.message,
      });
    }
    setLoading(false);
  };

  const handleDecrease = async () => {
    if (quantity <= 1) return;
    setLoading(true);
    const res = await updateCartQuantity(item._id.toString(), "decrease");
    if (!res.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.message,
      });
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4500",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const res = await removeFromCart(item._id.toString());
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Item has been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#fff",
            customClass: {
              popup: "rounded-3xl",
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.message,
          });
        }
        setLoading(false);
      }
    });
  };

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-base-100 border border-base-200/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Image */}
      <div className="relative w-full sm:w-[120px] h-[120px] rounded-xl overflow-hidden bg-base-200/50 shrink-0 border border-base-200/50">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 120px"
          className="object-contain p-2"
        />
      </div>

      {/* Details & Controls */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold text-base-content leading-tight mb-2 pr-4">{item.title}</h3>
          <p className="text-sm text-base-content/60 font-medium">Price: ৳ {discountedPrice}</p>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-auto">
          <button 
            onClick={handleDecrease}
            disabled={quantity <= 1 || loading}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-base-200/70 hover:bg-base-300 disabled:opacity-30 transition-colors text-base-content/70"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-base-content w-6 text-center">{quantity}</span>
          <button 
            onClick={handleIncrease}
            disabled={loading}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-base-300 bg-base-100 hover:bg-base-200 disabled:opacity-30 transition-colors text-base-content"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:h-full w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-base-200/60 sm:pl-4">
        <p className="text-lg font-extrabold text-base-content whitespace-nowrap">
          ৳ {totalPrice}
        </p>
        <button 
          onClick={handleDelete}
          disabled={loading}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-error/30 text-error hover:bg-error hover:text-white transition-all duration-200 bg-error/5 group disabled:opacity-30"
        >
          <Trash2 className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
