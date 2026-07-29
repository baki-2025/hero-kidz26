"use server";

import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cache } from "react";

const getCartCollection = async () => {
  return await dbConnect(collections.CART);
};

// =========================
// Add to Cart
// =========================
export const handleCart = async (productId) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  // Validate productId
  if (!ObjectId.isValid(productId)) {
    return {
      success: false,
      message: "Invalid product ID",
    };
  }

  const cartCollection = await getCartCollection();
  const productCollection = await dbConnect(collections.PRODUCTS);

  const productObjectId = new ObjectId(productId);

  // Find product
  const product = await productCollection.findOne({
    _id: productObjectId,
  });

  if (!product) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  // Check if product already exists in user's cart
  const query = {
    email: user.email,
    productId: productObjectId,
  };

  const existingItem = await cartCollection.findOne(query);

  // If already exists → increase quantity
  if (existingItem) {
    if (existingItem.quantity >= 10) {
      return {
        success: false,
        message: "Maximum quantity is 10",
      };
    }

    const result = await cartCollection.updateOne(query, {
      $inc: {
        quantity: 1,
      },
    });

    return {
      success: result.modifiedCount > 0,
      message: "Cart quantity increased",
    };
  }

  // Calculate discounted price
  const discountPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  // Create new cart item
  const newItem = {
    productId: productObjectId,
    email: user.email,
    username: user.name || "",
    title: product.title,
    image: product.image,
    quantity: 1,
    price: discountPrice,
  };

  const result = await cartCollection.insertOne(newItem);

  return {
    success: result.acknowledged,
    message: "Product added to cart",
  };
};

// =========================
// Get Cart
// =========================
export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user?.email) {
    return [];
  }

  const cartCollection = await getCartCollection();

  const items = await cartCollection
    .find({
      email: user.email,
    })
    .toArray();

  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    productId: item.productId?.toString(),
  }));
});

// =========================
// Delete Item
// =========================
export const deleteItemsFromCart = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (!ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid cart item ID",
    };
  }

  const cartCollection = await getCartCollection();

  const result = await cartCollection.deleteOne({
    _id: new ObjectId(id),
    email: user.email,
  });

  return {
    success: result.deletedCount > 0,
  };
};

// =========================
// Increase Quantity
// =========================
export const increaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (!ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid cart item ID",
    };
  }

  if (quantity >= 10) {
    return {
      success: false,
      message: "Maximum quantity is 10",
    };
  }

  const cartCollection = await getCartCollection();

  const result = await cartCollection.updateOne(
    {
      _id: new ObjectId(id),
      email: user.email,
    },
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

// =========================
// Decrease Quantity
// =========================
export const decreaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (!ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid cart item ID",
    };
  }

  if (quantity <= 1) {
    return {
      success: false,
      message: "Quantity cannot be less than 1",
    };
  }

  const cartCollection = await getCartCollection();

  const result = await cartCollection.updateOne(
    {
      _id: new ObjectId(id),
      email: user.email,
    },
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

// =========================
// Clear Cart
// =========================
export const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const cartCollection = await getCartCollection();

  const result = await cartCollection.deleteMany({
    email: user.email,
  });

  return {
    success: result.deletedCount > 0,
    deletedCount: result.deletedCount,
  };
};

