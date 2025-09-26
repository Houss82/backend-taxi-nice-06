const connectDB = require("./models/connection");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const cors = require("cors");
app.use(cors());

// Connexion à la base de données avec gestion d'erreur
let isConnected = false;
connectDB()
  .then(() => {
    isConnected = true;
    console.log("Base de données connectée et prête");
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données:", error);
  });
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware pour vérifier la connexion à la base de données
app.use("/users", (req, res, next) => {
  if (!isConnected) {
    return res.status(503).json({
      message:
        "Service temporairement indisponible - Connexion à la base de données en cours",
    });
  }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
