# WeatherAppBeta_backend

Backend – Weather App (OpenWeatherMap API)
Description

This backend was developed using Node.js and Express, and serves as the REST API for a weather application connected to OpenWeatherMap.
It allows users to save cities, retrieve current weather data based on city name or geographic coordinates, and manage a personalized list of saved locations using a MongoDB database.

The server interacts with the frontend through secured RESTful routes, stores essential weather information (temperature, description, icon), and ensures data persistence per user.
Features

    Fetch weather data by city name or geolocation

    Save cities associated with a specific user

    Delete cities by name or MongoDB ID

    Retrieve all saved cities for a user

    Dynamic integration of weather icons

    PokéAPI connection and weather data manipulation (optional extension)

Tech Stack

    Node.js

    Express

    MongoDB + Mongoose

    OpenWeatherMap API: https://openweathermap.org/api

    RESTful architecture

Route Structure
/weather

    POST / – Add a city by name using the weather API

    POST /position – Get weather data by latitude and longitude

    DELETE /:cityName – Delete a city by its name

    DELETE /id/:cityId – Delete a city by MongoDB ID

    GET /search/:cityName – Retrieve stored data for a specific city

/users

    GET /:userId/cities – Fetch all saved cities for a given user

Data Models
City

{
  cityName: String,
  main: String,
  description: String,
  icon: String,
  tempMin: Number,
  tempMax: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}

User

{
  name: String,
  email: String,
  password: String // hashed
}

Getting Started Locally

    Clone the repository

git clone <repository-url>
cd backend

    Install dependencies

npm install

    Create a .env file at the root with the following content

OWM_API_KEY=your_openweathermap_api_key
MONGO_URI=your_mongodb_connection_string
PORT=3000

    Start the server

node index.js

Notes

    This version does not include authentication, but it can easily be extended using JWT or other auth systems.

    Designed to work with a Vanilla JavaScript or React frontend.

Backend – Application météo (API OpenWeatherMap)
Description

Ce backend a été développé avec Node.js et Express, et constitue l’API REST d’une application météo connectée à OpenWeatherMap.
Il permet d’enregistrer des villes associées à des utilisateurs, d’obtenir la météo actuelle via le nom d'une ville ou les coordonnées GPS, et de gérer dynamiquement la liste des villes sauvegardées dans une base de données MongoDB.

Le serveur interagit avec le frontend via des routes sécurisées, gère le stockage des données météo essentielles (températures, descriptions, icônes) et assure la persistance par utilisateur.
Fonctionnalités

    Récupération de la météo via nom de ville ou géolocalisation

    Enregistrement de villes liées à un utilisateur

    Suppression de villes par nom ou par identifiant

    Récupération des villes sauvegardées d’un utilisateur

    Intégration d’icônes météo dynamiques

    Connexion à la PokéAPI et manipulation des données météo

Stack technique

    Node.js

    Express

    MongoDB + Mongoose

    API OpenWeatherMap (https://openweathermap.org/api)

    Architecture RESTful

Structure des routes
/weather

    POST / : ajoute une ville en la recherchant via l’API météo

    POST /position : récupère la météo via coordonnées GPS

    DELETE /:cityName : supprime une ville par nom

    DELETE /id/:cityId : supprime une ville par identifiant MongoDB

    GET /search/:cityName : renvoie les données météo d’une ville enregistrée

/users

    GET /:userId/cities : récupère toutes les villes enregistrées pour un utilisateur donné

Modèles de données
City

{
  cityName: String,
  main: String,
  description: String,
  icon: String,
  tempMin: Number,
  tempMax: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}

User

{
  name: String,
  email: String,
  password: String // hashé
}

Démarrage local

    Cloner le dépôt

git clone <lien-du-repo>
cd backend

    Installer les dépendances

npm install

    Créer un fichier .env à la racine avec :

OWM_API_KEY=your_openweathermap_api_key
MONGO_URI=your_mongodb_connection_string
PORT=3000

    Lancer le serveur

node index.js

Remarques

    Le backend ne gère pas l’authentification dans cette version mais peut facilement être intégré avec JWT.

    L’API est conçue pour être utilisée par un frontend React ou Vanilla JS.