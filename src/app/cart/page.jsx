import Link from "next/link";
import { dbConnect, collections } from "@/lib/dbConnect";
import CartItem from "@/components/cart/CartItem";

const fetchCartItems = async () => {
  const cartCollection = await dbConnect(collections.CART);

  return await cartCollection
    .find({ userEmail: "guest@example.com" })
    .sort({ addedAt: -1 })
    .toArray();
};

export default async function CartPage() {
  const cartItems = await fetchCartItems();
  const itemCount = cartItems.length;

  return (
    <section className="min-h-screen bg-base-100 py-10">
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-1.5 h-12 bg-primary rounded-full"></div>
            <h1 className="text-5xl font-extrabold text-base-content">
              My Cart
            </h1>
          </div>

          <p className="text-lg text-base-content/70 ml-6">
            <span className="font-bold text-primary">{itemCount}</span>{" "}
            {itemCount === 1 ? "Item" : "Items"} Found in the Cart
          </p>
        </div>

        {/* Empty Cart */}
        {itemCount === 0 ? (
          <div className="bg-base-200 rounded-3xl p-12 text-center shadow-sm">
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-base-content/70 mb-8">
              Start shopping and add your favorite products.
            </p>

            <Link href="/products" className="btn btn-primary btn-lg px-10">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {cartItems.map((item) => (
              <CartItem
                key={item._id.toString()}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
