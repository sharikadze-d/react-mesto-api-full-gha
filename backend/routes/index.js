const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use(userRouter);
router.use(cardRouter);
router.use('/*', () => { throw new NotFoundError('Страница не найдена'); });

module.exports = router;
