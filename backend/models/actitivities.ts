/*{
  _id: ObjectId,

  userId: ObjectId,

  type: {
    type: String,
    enum: [
      "started_game",
      "completed_game",
      "review_posted",
      "favorite_added",
      "rating_added"
    ]
  },

  gameId: ObjectId,

  reviewId: ObjectId,

  metadata: {
    rating: Number,
    completionPercentage: Number
  },

  createdAt: Date
}*/
