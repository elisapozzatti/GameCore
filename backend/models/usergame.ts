import mongoose from "mongoose";

const UserGameSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  gameId: mongoose.Schema.Types.ObjectId,
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
