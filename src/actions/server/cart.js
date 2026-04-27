"use server"

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const addToCart = async (productData) => {
  try {
    const cartCollection = await dbConnect(collections.CART);
    
    const cartItem = {
      ...productData,
      quantity: productData.quantity || 1,
      addedAt: new Date(),
      userEmail: "guest@example.com" 
    };

    const result = await cartCollection.insertOne(cartItem);
    
    if (result.insertedId) {
      revalidatePath("/cart");
      return { success: true, message: "Added to cart successfully!" };
    } else {
      return { success: false, message: "Failed to add to cart." };
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, message: "An error occurred while adding to cart." };
  }
};

export const updateCartQuantity = async (itemId, action) => {
  try {
    const cartCollection = await dbConnect(collections.CART);
    const update = action === "increase" ? { $inc: { quantity: 1 } } : { $inc: { quantity: -1 } };
    
    const result = await cartCollection.updateOne(
      { _id: new ObjectId(itemId) },
      update
    );

    if (result.modifiedCount > 0) {
      revalidatePath("/cart");
      return { success: true, message: `Quantity ${action}d successfully!` };
    } else {
      return { success: false, message: "Failed to update quantity." };
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    return { success: false, message: "An error occurred while updating quantity." };
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const cartCollection = await dbConnect(collections.CART);
    const result = await cartCollection.deleteOne({ _id: new ObjectId(itemId) });

    if (result.deletedCount > 0) {
      revalidatePath("/cart");
      return { success: true, message: "Item removed from cart!" };
    } else {
      return { success: false, message: "Failed to remove item." };
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false, message: "An error occurred while removing item." };
  }
};
