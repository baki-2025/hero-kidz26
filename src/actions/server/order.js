"use server";

import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";
import { sendEmail } from "@/lib/sendEmail";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";

const getOrderCollection = async () => {
  return await dbConnect(collections.ORDER);
};

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const cart = await getCart();

  if (cart.length === 0) {
    return {
      success: false,
      message: "Your cart is empty.",
    };
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const newOrder = {
    email: user.email,
    customerName: user.name,
    createdAt: new Date().toISOString(),
    status: "Pending",
    paymentStatus: "Unpaid",
    totalItems: cart.length,
    totalPrice,
    items: cart,
    ...payload,
  };

  const orderCollection = await getOrderCollection();

  const result = await orderCollection.insertOne(newOrder);

  if (!result.insertedId) {
    return {
      success: false,
      message: "Failed to create order.",
    };
  }

  // Clear Cart
  await clearCart();

  // Send Invoice Email
  try {
    await sendEmail({
      to: user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: orderInvoiceTemplate({
        orderId: result.insertedId.toString(),
        items: cart,
        totalPrice,
      }),
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    // Order সফল হয়েছে, তাই email fail হলেও order rollback করছি না।
  }

  return {
    success: true,
    orderId: result.insertedId.toString(),
    message: "Order placed successfully.",
  };
};