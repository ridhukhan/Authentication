import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User", // sender
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User", // receiver
      required: true,
    },
    message: {
      type: String,
      required: true, // message content
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
