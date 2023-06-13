import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    name: String,
    password: String,

  },
  { timestamps: true }
);

const User = mongoose.model("User",  UsersSchema);
export default User;