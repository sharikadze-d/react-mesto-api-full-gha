require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');

const PORT = 3001;
const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.use('/signin', loginValidation, login);
app.use('/signup', createUserValidation, createUser);
app.use(auth, router);

app.use(errors());
app.use(handleError);

app.listen(PORT);
