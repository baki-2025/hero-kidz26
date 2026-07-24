"use server";

import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

// Add to Cart
export const handleCart = async ({ product, inc = true }) => {
  const cartCollection = await dbConnect(collections.CART);
  const user = await getUser();

  if (!user) return { success: false };

  const query = {
    email: user.email,
    productId: product._id,
  };

  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    const result = await cartCollection.updateOne(query, {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    });

    return { success: result.modifiedCount > 0 };
  }

  const newData = {
    productId: product._id,
    email: user.email,
    title: product.title,
    quantity: 1,
    image: product.image,
    price: product.price - (product.price * product.discount) / 100,
    username: user.name,
  };

  const result = await cartCollection.insertOne(newData);

  return { success: result.acknowledged };
};

// Update Cart Quantity
export const updateCartQuantity = async (cartId, quantity) => {
  const cartCollection = await dbConnect(collections.CART);

  const result = await cartCollection.updateOne(
    { _id: new ObjectId(cartId) },
    {
      $set: {
        quantity,
      },
    }
  );

  return {
    success: result.modifiedCount > 0,
  };
};

// Remove Cart Item
export const removeFromCart = async (cartId) => {
  const cartCollection = await dbConnect(collections.CART);

  const result = await cartCollection.deleteOne({
    _id: new ObjectId(cartId),
  });

  return {
    success: result.deletedCount > 0,
  };
};