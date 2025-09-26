const mongoose = require("mongoose");

// Utiliser les variables d'environnement pour la sécurité
const connectionString =
  process.env.MONGODB_URI ||
  "mongodb+srv://mansourhoussem1982:0LshwJSY0rc7rFQ1@cluster0.5lywams.mongodb.net/taxi-nice-06";

const connectDB = async () => {
  try {
    // Vérifier si déjà connecté
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB déjà connecté 👍");
      return;
    }

    // Configuration optimisée pour Vercel/serverless
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 30000, // 30 secondes pour Vercel
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      bufferCommands: false, // Important pour les fonctions serverless
      bufferMaxEntries: 0, // Important pour les fonctions serverless
    });
    console.log("MongoDB connecté avec succès 👍");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error.message);
    // Ne pas faire process.exit(1) sur Vercel, juste logger l'erreur
    throw error;
  }
};

module.exports = connectDB;
