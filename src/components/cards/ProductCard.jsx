import Link from "next/link";
import CartButton from "../buttons/CartButton";
import Image from "next/image";
import { FaEye, FaStar } from "react-icons/fa";

const ProductCard = ({ product, priority = false }) => {
  const { _id, title, image, price, discount, ratings, reviews, sold } = product;
  const productId = _id?.toString();

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden max-w-[260px] mx-auto w-full flex flex-col">

      {/* Image Container with Link */}
      <Link href={`/products/${productId}`} className="relative block overflow-hidden">
        <figure className="px-3 pt-3">
          <Image
            priority={priority}
            src={image}
            alt={title}
            width={400}
            height={300}
            className="rounded-xl object-cover h-48 w-full group-hover:scale-110 transition-transform duration-500"
          />
        </figure>
        {discount > 0 && (
          <div className="absolute top-4 left-4 badge badge-error text-white font-bold p-2 text-[10px] animate-bounce">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="card-body p-3">

        {/* Title */}
        <Link href={`/products/${productId}`}>
          <h2 className="card-title text-sm font-bold line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {title}
          </h2>
        </Link>

        {/* Rating & Sold */}
        <div className="flex items-center justify-between text-[11px] mt-1">
          <div className="flex items-center gap-1 font-semibold">
            <FaStar className="text-yellow-500 text-[9px]" />
            <span>{ratings}</span>
            <span className="text-gray-400">({reviews})</span>
          </div>
          <p className="text-gray-500 text-right">
            Sold: {sold}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2 mb-3">
          <span className="text-base font-extrabold text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="line-through text-[11px] text-gray-400">
              ৳{price}
            </span>
          )}
        </div>

        {/* Buttons Group */}
        <div className="card-actions flex-col w-full gap-2 mt-auto">
          <Link href={`/products/${productId}`} className="btn btn-outline btn-primary w-full gap-2 rounded-lg text-xs min-h-[2rem] h-8 px-2 transition-all">
            <FaEye />
            View Details
          </Link>
          <CartButton product={product} className="w-full text-xs min-h-[2rem] h-8 px-2 rounded-lg gap-2 transition-all" />
        </div>

      </div>
    </div>
  );
};

export default ProductCard;