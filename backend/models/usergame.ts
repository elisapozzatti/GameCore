import mongoose from "mongoose";

const UserGameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Games" },
  status: {
    type: String,
    enum: [
      "wishlist",
      "playing",
      "paused",
      "completed",
      "dropped",
      "replaying",
    ],
  },
  completionPercentage: Number,
  personalRating: Number,
  inspirationLevel: Number,
  hoursPlayed: Number,
  isFavorite: Boolean,
  wouldRecommend: Boolean,
  notes: String,
});

const UserGame = mongoose.model("UserGame", UserGameSchema);

export default UserGame;
