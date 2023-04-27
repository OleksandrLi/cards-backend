const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const {
  createGameValidation,
  joinGameValidation,
} = require("../validations/games");
const GameModal = require("../models/Games");
const { v4: uuidv4 } = require("uuid");

/* GET game. */
router.get("/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    GameModal.findOne({ gameId }, {}, { returnDocument: "after" })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Гра не знайдена",
          });
        }
        res.json(doc);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Не вдалось приєднатись до гри",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати гру",
    });
  }
});

/* Create game. */
router.post("/createGame", createGameValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const gameId = uuidv4();

    const doc = new GameModal({
      gameId,
      playerOneName: req.body.playerOneName,
      duration: req.body.duration,
      typeWords: req.body.typeWords,
    });

    const game = await doc.save();

    res.json(game);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Гра не створилась",
    });
  }
});

/* Join to game. */
router.post("/joinGame", joinGameValidation, async (req, res, next) => {
  try {
    const gameId = req.body.gameId;

    GameModal.findOneAndUpdate(
      { gameId },
      { playerTwoName: req.body.playerTwoName },
      { returnDocument: "after" }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Гра не знайдена",
          });
        }
        res.json(doc);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Не вдалось приєднатись до гри",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось підключитись до гри",
    });
  }
});

module.exports = router;
