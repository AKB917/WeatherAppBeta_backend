var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const City = require('../models/cities');

const OWM_API_KEY = process.env.OWM_API_KEY;

router.post('/', (req, res) => {
	const { cityName, userId } = req.body;

	if (!cityName || !userId) {
		return res.status(400).json({ result: false, error: "Champs manquants." });
	}

	City.findOne({ cityName: { $regex: new RegExp(cityName, 'i') }, user: userId }).then(dbData => {
		if (dbData === null) {
			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OWM_API_KEY}&units=metric`)
				.then(response => response.json())
				.then(apiData => {
					const newCity = new City({
						cityName,
						main: apiData.weather[0].main,
						description: apiData.weather[0].description,
						tempMin: apiData.main.temp_min,
						tempMax: apiData.main.temp_max,
						user: userId,
					});

					newCity.save().then(newDoc => {
						res.json({ result: true, weather: newDoc });
					});
				});
		} else {
			res.json({ result: false, error: 'City already saved' });
		}
	});
});

router.get('/:userId', (req, res) => {
	City.find({ user: req.params.userId }).then(data => {
		res.json({ weather: data });
	});
});

router.get("/:cityName", (req, res) => {
  City.findOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then(data => {
    if (data) {
      res.json({ result: true, weather: data });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});

router.delete("/:cityName", (req, res) => {
  City.deleteOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then(deletedDoc => {
    if (deletedDoc.deletedCount > 0) {
      // document successfully deleted
      City.find().then(data => {
        res.json({ result: true, weather: data });
      });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});

router.post('/position', (req, res) => {
	const { latitude, longitude } = req.body;

	if (!latitude || !longitude) {
		return res.status(400).json({ result: false, error: "Latitude et longitude requises." });
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}&units=metric`)
		.then(response => response.json())
		.then(apiData => {
			if (!apiData || !apiData.weather) {
				return res.status(500).json({ result: false, error: "Erreur API météo." });
			}

			const weather = {
				cityName: apiData.name,
				main: apiData.weather[0].main,
				description: apiData.weather[0].description,
				tempMin: apiData.main.temp_min,
				tempMax: apiData.main.temp_max,
			};

			res.json({ result: true, weather });
		})
		.catch(error => {
			console.error("Erreur fetch météo :", error);
			res.status(500).json({ result: false, error: "Erreur serveur météo." });
		});
});

const City = require('../models/cities'); // ajoute cette ligne en haut si pas encore

router.get('/:userId/cities', (req, res) => {
	const userId = req.params.userId;

	City.find({ user: userId })
		.then(cities => {
			res.json({ result: true, weather: cities });
		})
		.catch(err => {
			console.error("Erreur récupération villes utilisateur :", err);
			res.status(500).json({ result: false, error: "Erreur serveur" });
		});
});


module.exports = router;
