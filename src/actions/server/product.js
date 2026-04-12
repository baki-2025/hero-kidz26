"use server"

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const collection = await dbConnect(collections.PRODUCTS);
  const products = await collection.find().toArray();
  // ✅ Serialize _id for Client Components
  return products.map((p) => ({ ...p, _id: p._id.toString() }));
};

export const getSingleProduct = async (id) => {
  if (!id || id.length !== 24) return null;

  const collection = await dbConnect(collections.PRODUCTS);
  const product = await collection.findOne({ _id: new ObjectId(id) });

  if (!product) return null;
  // ✅ Serialize _id for Client Components
  return { ...product, _id: product._id.toString() } || {};
};