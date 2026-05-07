/*{
  _id: ObjectId,

  username: String,
  email: String,
  passwordHash: String,

  avatar: String,
  banner: String,
  bio: String,

  favoriteGenres: [String],

  createdAt: Date,
  updatedAt: Date,

  followersCount: Number,
  followingCount: Number,

  gamesCompleted: Number,
  totalHoursPlayed: Number,

  profileVisibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  }
}
  */
