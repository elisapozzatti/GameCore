import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  avatar: String,
  bio: String,
  favoriteGenres: [String],
  followersCount: Number,
  followingCount: Number,
  gamesCompleted: Number,
  totalHoursPlayed: Number,
});

const Users = mongoose.model("Users", UsersSchema);
export default Users;
