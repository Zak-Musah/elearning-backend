import mongoose from "mongoose";
const { Schema } = mongoose;

const { ObjectId } = mongoose.Schema;
const businessSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    owners: {
      type: [],
      trim: true,
      required: true,
    },
    businessLogo: {
      type: {},
      default: {},
    },
    artifacts: [],
    role: {
      type: [String],
      default: ["user"],
      enum: ["user", "Instructor", "Admin"],
    },
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Business", businessSchema);
