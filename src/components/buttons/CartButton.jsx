"use client"
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = ({ product }) => {
    const isLogin = false;
    const router = useRouter();
    const path = usePathname();
    const Add2Cart = () => {
        if (isLogin) alert(product._id);
        else {
            router.push(`/login?callbackUrl=${path}`);
        }

    };

    return (
        <div>
            <button onClick={Add2Cart} className="btn btn-primary  w-full flex gap-2 rounded-2xl">
                <FaShoppingCart />
                Add to Cart
            </button>
        </div>
    );
};

export default CartButton;