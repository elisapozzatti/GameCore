import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
  /*_id: ObjectId,*/
  igdbId: Number,
  title: String,
  coverImage: String,
  genres: [String],
  rating: Number,
  summary: String,
  releaseDate: Date,
  totalFollows: Number,
  publishers: [String],
});

const Games = mongoose.model("Games", gamesSchema);
export default Games;
