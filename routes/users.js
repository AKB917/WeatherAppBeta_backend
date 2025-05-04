const express = require('express');
const router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

// ✅ Réponse CORS pour requête préflight (OPTIONS)
router.options('/signup', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Pour développement. En prod, remplace * par ton domaine front
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

router.options('/signin', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

// ✅ Route d'inscription
router.post('/signup', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (!checkBody(req.body, ['name', 'email', 'password'])) {
    return res.json({ result: false, error: 'Missing or empty fields' });
  }

  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      newUser.save().then(() => {
        res.json({ result: true, User: newUser });
        console.log('User registered');
      });
    } else {
      res.json({ result: false, error: 'User already exists' });
      console.log('User already exists');
    }
  });
});

// ✅ Route de connexion
router.post('/signin', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (!checkBody(req.body, ['email', 'password'])) {
    return res.json({ result: false, error: 'Missing or empty fields' });
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

module.exports = router;
