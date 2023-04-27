import { WordsType } from "../constants";

const mongoose = require('mongoose');

const twoPlayersGameSchema = new mongoose.Schema(
    {
        gameId: {
            type: String,
            require: true,
            unique: true,
        },
        gameIdShare: {
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
            type: WordsType,
            require: true,
        }
    },
    {
        timestamps: true,
    },
)

export default mongoose.model("Game", twoPlayersGameSchema)