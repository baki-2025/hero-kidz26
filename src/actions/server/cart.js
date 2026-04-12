"use server"

import { dbConnect, collections } from "@/lib/dbConnect";

export const addToCart = async (productData) => {
  try {
    const cartCollection = await dbConnect(collections.CART);
    
    // In a real app, we would add the userEmail/userId from the session here.
    // For now, we'll just store the product details.
    const cartItem = {
      ...productData,
      addedAt: new Date(),
      // placeholder for user identification
      userEmail: "guest@example.com" 
    };

    const result = await cartCollection.insertOne(cartItem);
    
    if (result.insertedId) {
      return { success: true, message: "Added to cart successfully!" };
    } else {
      return { success: false, message: "Failed to add to cart." };
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, message: "An error occurred while adding to cart." };
  }
};
