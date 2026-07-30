import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact Us</p>
            <h1 className="text-4xl font-bold mt-2">We’d love to hear from you</h1>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Whether you have a question about our toys, need help with an order, or want to share feedback, our team is here to help.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card bg-base-100 border border-base-200 shadow-sm p-5">
              <h2 className="font-semibold text-lg">Email</h2>
              <p className="text-gray-600 mt-2">support@herokidz.com</p>
            </div>
            <div className="card bg-base-100 border border-base-200 shadow-sm p-5">
              <h2 className="font-semibold text-lg">Phone</h2>
              <p className="text-gray-600 mt-2">+880 1712-345678</p>
            </div>
            <div className="card bg-base-100 border border-base-200 shadow-sm p-5 sm:col-span-2">
              <h2 className="font-semibold text-lg">Address</h2>
              <p className="text-gray-600 mt-2">House 12, Road 4, Dhanmondi, Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-200 shadow-sm p-6">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <form className="space-y-4 mt-5">
            <input className="input input-bordered w-full" placeholder="Your name" />
            <input className="input input-bordered w-full" placeholder="Your email" />
            <textarea className="textarea textarea-bordered w-full" rows="4" placeholder="Write your message" />
            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </section>

      <section className="mt-10 text-center">
        <Link href="/products" className="btn btn-outline btn-primary">
          Browse Products
        </Link>
      </section>
    </main>
  );
}
