import mongoose from "mongoose";
import { configApp } from "./config";

export function dbConfig() {
  try {
    mongoose.connect(configApp.database_url);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection field");
  }
}
