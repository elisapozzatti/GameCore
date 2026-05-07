/*{
  _id: ObjectId,

  userId: ObjectId,
  gameId: ObjectId,

  status: {
    type: String,
    enum: [
      "wishlist",
      "playing",
      "paused",
      "completed",
      "dropped",
      "replaying"
    ]
  },

  completionPercentage: Number,

  personalRating: Number,

  inspirationLevel: Number,

  hoursPlayed: Number,

  isFavorite: Boolean,

  wouldRecommend: Boolean,

  notes: String,

  startedAt: Date,
  completedAt: Date,

  createdAt: Date,
  updatedAt: Date
}*/
