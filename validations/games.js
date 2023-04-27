const { body } = require("express-validator");

const WordsType = ["A1", "A2", "B1", "B2", "C1", "C2", "Animals", "Food"];

const createGameValidation = [
  body("playerOneName", "Занадто коротке ім'я").isLength({ min: 2 }),
  body("duration", "Помилка з тривалістю таймера").optional(),
  body("typeWords", "Такий тип слів не підтримується").isIn(WordsType),
];

const joinGameValidation = [
  body("playerTwoName", "Занадто коротке ім'я").isLength({ min: 2 }),
];

module.exports = { createGameValidation, joinGameValidation };
