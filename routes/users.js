var express = require('express');
var router = express.Router();

const User = require('../models/users');
const City = require('../models/cities');
const { checkBody } = require('../modules/checkBody');

router.post('/signup', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // ou remplace * par l'URL de ton front
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (!checkBody(req.body, ['name', 'email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      newUser.save().then(() => {
        res.json({ result: true , User: newUser });
        console.log('User registered');
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
      console.log('User already exists');
    }
  });
});

router.post('/signin', (req, res) => {
  
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email, password: req.body.password }).then(data => {
    if (data) {
      res.json({ result: true, user: data });
      console.log('User connected');
    } else {
      res.json({ result: false, error: 'User not found' });
      console.log('User not found');
    }
  });
});

// GET /users/:userId/cities

router.get('/:userId/cities', async (req, res) => {
  try {
    const cities = await City.find({ user: req.params.userId });
    res.json({ result: true, weather: cities });
  } catch (err) {
    console.error("Erreur récupération villes utilisateur :", err);
    res.status(500).json({ result: false, error: "Erreur serveur" });
  }
});

module.exports = router;
