"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, discount, ratings, reviews, sold } = product;
  const productId = _id?.toString();

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
      
      {/* Image Container with Link */}
      <Link href={`/products/${productId}`} className="relative block overflow-hidden">
        <figure className="px-4 pt-4">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="rounded-2xl object-cover h-48 w-full group-hover:scale-110 transition-transform duration-500"
          />
        </figure>
        {discount > 0 && (
          <div className="absolute top-6 left-6 badge badge-error text-white font-bold p-3 animate-bounce">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="card-body p-5">
        
        {/* Title */}
        <Link href={`/products/${productId}`}>
          <h2 className="card-title text-base font-bold line-clamp-2 min-h-[3rem] hover:text-primary transition-colors">
            {title}
          </h2>
        </Link>

        {/* Rating & Sold */}
        <div className="flex items-center justify-between text-xs mt-1">
          <div className="flex items-center gap-1 font-semibold">
            <FaStar className="text-yellow-500" />
            <span>{ratings}</span>
            <span className="text-gray-400">({reviews})</span>
          </div>
          <p className="text-gray-500 text-right">
            Sold: {sold}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3 mb-4">
          <span className="text-xl font-extrabold text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="line-through text-sm text-gray-400">
              ৳{price}
            </span>
          )}
        </div>

        {/* Buttons Group */}
        <div className="card-actions flex-col gap-2">
          <Link href={`/products/${productId}`} className="btn btn-outline btn-primary btn-sm w-full gap-2 rounded-xl">
            <FaEye />
            View Details
          </Link>
          <button className="btn btn-primary btn-sm w-full gap-2 rounded-xl">
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;