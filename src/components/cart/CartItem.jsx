import Image from "next/image";
import Link from "next/link";

const CartItem = ({ item }) => {
  const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
  const originalPrice = item.price;
  const quantity = item.quantity || 1;
  const totalPrice = discountedPrice * quantity;

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="relative w-full lg:w-36 h-36 rounded-3xl overflow-hidden bg-base-200">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1023px) 100vw, 144px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold line-clamp-2">{item.title}</h3>
              <p className="text-sm text-base-content/60">Added: {new Date(item.addedAt).toLocaleDateString()}</p>
            </div>
            <Link href={`/products/${item._id}`} className="btn btn-sm btn-outline btn-primary">
              View product
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-base-content/70">
            <div>
              <span className="font-semibold">Price</span>
              <p>৳{discountedPrice}</p>
            </div>
            {item.discount > 0 && (
              <div>
                <span className="font-semibold">Original</span>
                <p className="line-through">৳{originalPrice}</p>
              </div>
            )}
            <div>
              <span className="font-semibold">Quantity</span>
              <p>{quantity}</p>
            </div>
            <div>
              <span className="font-semibold">Total</span>
              <p className="text-primary font-semibold">৳{totalPrice}</p>
            </div>
          </div>

          <p className="text-sm text-base-content/70 line-clamp-3">{item.description || item.bangla || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
