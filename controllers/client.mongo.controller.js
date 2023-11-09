// controllers/userController.js

const Client = require("../models/Client.mongo.model.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const objectId = require('mongoose').Types.ObjectId
const config = require('../configs/config.js')

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if email exists
    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'This email already exists.' });
    }

    // Haching password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new Client({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Persist new user
    await newUser.save();
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ' + error);
    res.status(500).json({ error: 'Sorry, an error happened. Please, try later.' });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherchez l'utilisateur par email
    const user = await Client.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_TOKEN_LIFE_TME,
    });
    // const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    //   expiresIn: config.JWT_REFRESH_TOKEN_LIFE_TIME,
    // });
    // Inclure les informations de l'utilisateur dans la réponse
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image
    };
    // Renvoyer à la fois le token et les informations de l'utilisateur
    res.status(200).json({ token, user: userResponse});
  } catch (error) {
    console.error('Error during authentication: ' + error);
    res.status(500).json({ error: 'An error occurred during authentication.' });
  }
};