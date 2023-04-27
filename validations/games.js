const { body } = require('express-validator');

export const createGame = [
    body("playerOneName").isLength({min: 2}),
    body("duration").optional(),
    body("typeWords").is
]