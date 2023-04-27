const mongoose = require("mongoose");

const twoPlayersGameSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      require: true,
      unique: true,
    },
    playerOneName: {
      type: String,
      require: true,
    },
    playerTwoName: String,
    duration: Number,
    typeWords: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", twoPlayersGameSchema);
