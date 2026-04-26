"use client"
import { usePathname, useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = ({ product, size, className = "" }) => {
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
        <button onClick={Add2Cart} className={`btn btn-primary flex justify-center items-center ${size ? `btn-${size}` : ''} ${className}`}>
            <FaShoppingCart />
            Add to Cart
        </button>
    );
};

export default CartButton;