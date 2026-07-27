"use server";

import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cache } from "react";

const getCartCollection = async () => {
  return await dbConnect(collections.CART);
};

// Add to Cart
export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const cartCollection = await getCartCollection();

  const query = {
    email: user.email,
    productId: product._id,
  };

  const existingItem = await cartCollection.findOne(query);

  if (existingItem) {
    const result = await cartCollection.updateOne(query, {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    });

    return {
      success: result.modifiedCount > 0,
    };
  }

  const newItem = {
    productId: product._id,
    email: user.email,
    username: user.name,
    title: product.title,
    image: product.image,
    quantity: 1,
    price: product.price - (product.price * product.discount) / 100,
  };

  const result = await cartCollection.insertOne(newItem);

  return {
    success: result.acknowledged,
  };
};

// Get Cart
export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return [];

  const cartCollection = await getCartCollection();

  const items = await cartCollection
    .find({ email: user.email })
    .toArray();

  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
});

// Delete Item
export const deleteItemsFromCart = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  if (!ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid id",
    };
  }

  const cartCollection = await getCartCollection();

  const result = await cartCollection.deleteOne({
    _id: new ObjectId(id),
  });

  return {
    success: result.deletedCount > 0,
  };
};

// Increase Quantity
export const increaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  if (quantity >= 10) {
    return {
      success: false,
      message: "Maximum quantity is 10",
    };
  }

  const cartCollection = await getCartCollection();

  const result = await cartCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $inc: {
        quantity: 1,
      },
    }
  );

  return {
    success: result.modifiedCount > 0,
  };
};

// Decrease Quantity
export const decreaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  if (quantity <= 1) {
    return {
      success: false,
      message: "Quantity cannot be less than 1",
    };
  }

  const cartCollection = await getCartCollection();

  const result = await cartCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $inc: {
        quantity: -1,
      },
    }
  );

  return {
    success: result.modifiedCount > 0,
  };
};

// Clear Cart
export const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  const cartCollection = await getCartCollection();

  const result = await cartCollection.deleteMany({
    email: user.email,
  });

  return {
    success: result.deletedCount > 0,
    deletedCount: result.deletedCount,
  };
};