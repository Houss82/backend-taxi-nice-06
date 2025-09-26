const connectDB = require("./models/connection");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const cors = require("cors");

// Configuration CORS pour permettre les requêtes depuis le frontend
const corsOptions = {
  origin: [
    "http://localhost:3000", // Frontend en développement
    "https://taxi-nice-06.com", // Frontend déployé
    "https://www.taxi-nice-06.com", // Version www du domaine
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Permet l'envoi de cookies si nécessaire
};

app.use(cors(corsOptions));

// Connexion à la base de données avec gestion d'erreur
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
