"use client";
import { deleteItemsFromCart } from "@/actions/server/cart";
import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({
  item,
 removeItem
  
}) => {
    const {title, image, quantity, price,_id} = item;
    const handleDeleteCart = async() => {
         Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, remove it!"
}).then(async(result) => {
  if (result.isConfirmed){
    const result = await deleteItemsFromCart(_id);
    
    if(result.success){
      removeItem(_id);
        Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
} else{
     Swal.fire({
    title: "Opps!",
    text: "Something went wrong.",
    icon: "error"
  });
 }
}
});
    };

  return (
    <div className="card card-side bg-base-100 shadow-md border border-base-200 p-4">
      {/* Product Image */}
      <figure className="w-28 h-28 relative rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </figure>

      {/* Product Details */}
      <div className="card-body p-0 pl-5 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-lg line-clamp-2">
            {item.title}
          </h2>

          <p className="text-primary font-bold text-xl mt-2">
            ৳ {item.price}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
          {/* Quantity Controller */}
          <div className="join">
            <button
              // onClick={() => onDecrease(item)}
              className="btn btn-sm join-item btn-outline"
              disabled={item.quantity <= 1}
            >
              <FaMinus />
            </button>

            <button className="btn btn-sm join-item pointer-events-none">
              {item.quantity}
            </button>

            <button
              // onClick={() => onIncrease(item)}
              className="btn btn-sm join-item btn-outline"
            >
              <FaPlus />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => handleDeleteCart(item)}
            className="btn btn-sm btn-error text-white"
          >
            <FaTrash className="mr-2" />
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;