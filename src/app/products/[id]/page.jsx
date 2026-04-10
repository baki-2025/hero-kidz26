

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart, FaTruck, FaShieldAlt, FaUndo, FaQuestionCircle } from "react-icons/fa";
import { getSingleProduct } from "@/actions/server/product";

const ProductDetails = async ({ params }) => {
  // ✅ Next.js 15+ Compatibility: await params
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8">Product not found...</p>
        <Link href="/" className="btn btn-primary rounded-full px-8">
          Back to Home
        </Link>
      </div>
    );
  }

  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12">
      
      {/* Top Section: Breadcrumb & Title */}
      <div className="text-sm breadcrumbs mb-4 text-gray-500">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li className="text-primary font-semibold">{title}</li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image with Playful Border */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={800}
              height={600}
              priority
              className="rounded-xl object-cover w-full h-auto max-h-[600px] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-secondary leading-tight">
              {title}
            </h1>
            <p className="text-xl font-medium text-primary/80 italic">
              {bangla}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold gap-1">
              <FaStar />
              <span>{ratings}</span>
              <span className="font-normal opacity-70">({reviews} reviews)</span>
            </div>
            <div className="badge badge-outline badge-secondary border-dashed">
              {sold}+ Satisfied Kids
            </div>
          </div>

          <div className="p-6 bg-base-200/50 rounded-2xl border border-dashed border-base-300">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-primary">
                ৳{discountedPrice}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-xl line-through text-gray-400">৳{price}</span>
                  <span className="badge badge-error text-white font-bold px-3 py-4 text-lg">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">VAT included (where applicable)</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Main Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {info?.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-success mt-1">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-primary btn-lg rounded-2xl shadow-lg hover:shadow-primary/50 transition-all flex-1 gap-2">
              <FaShoppingCart />
              Add to Cart
            </button>
            <button className="btn btn-secondary btn-lg rounded-2xl shadow-lg hover:shadow-secondary/50 transition-all flex-1">
              Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4">
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-green-50 text-green-700 text-[10px] sm:text-xs">
              <FaTruck className="text-xl mb-1" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50 text-blue-700 text-[10px] sm:text-xs">
              <FaShieldAlt className="text-xl mb-1" />
              <span>Secure Payment</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-purple-50 text-purple-700 text-[10px] sm:text-xs">
              <FaUndo className="text-xl mb-1" />
              <span>Easy Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Q&A Tabs Style Layout */}
      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-base-200">
            <h2 className="text-2xl font-black mb-6 border-b-4 border-yellow-400 inline-block pb-2">
              Deep Dive Details
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none whitespace-pre-line leading-relaxed">
              {description}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <FaQuestionCircle className="text-primary" />
              Parents Q&A
            </h2>
            <div className="space-y-4">
              {qna?.map((item, i) => (
                <div key={i} className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-2xl">
                  <input type="checkbox" className="peer" /> 
                  <div className="collapse-title text-lg font-bold text-secondary">
                    Q: {item.question}
                  </div>
                  <div className="collapse-content text-gray-600 bg-base-200/30"> 
                    <p className="pt-4">A: {item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info - Maybe Related or Delivery Info */}
        <div className="space-y-6">
          <div className="card bg-secondary text-secondary-content rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-xl mb-4">Why Hero Kidz?</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">✨ Premium Quality</li>
              <li className="flex gap-2">🛡️ Non-Toxic Materials</li>
              <li className="flex gap-2">🎓 Educational Values</li>
              <li className="flex gap-2">💖 100% Kid Approved</li>
            </ul>
          </div>
          
          <div className="relative overflow-hidden group rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-white text-center">
            <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:rotate-12 transition-transform duration-500">
               <FaShoppingCart size={150} />
            </div>
            <h4 className="font-black text-2xl relative z-10">Limited Time Offer!</h4>
            <p className="text-sm opacity-90 mb-4 relative z-10">Get free stickers with every order above ৳2000</p>
            <button className="btn btn-white btn-sm rounded-full relative z-10 text-primary">Grab Now</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;