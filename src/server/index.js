var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  fetchWeather,
  fetchCoordinates,
  fetchLocationImage,
} = require("./fetchAPI");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

dotenv.config();

// Middleware function to get the city's coordinates
const getCoordinates = async (req, res, next) => {
  const { placename } = req.body;

  try {
    const response = await fetchCoordinates(placename);
    req.coords = {
      name: response.name,
      countryName: response.countryName,
      lat: response.lat,
      lon: response.lng,
    };
    next();
  } catch (error) {
    res.status(error.errorCode).json({ error: error.message });
  }
};

// Backend Routes
app.get("/", (_, res) => {
  res.sendFile("index.html");
});

app.post("/api/weather", getCoordinates, async (req, res) => {
  const { tripDate } = req.body;
  const { lat, lon, name, countryName } = req.coords;

  try {
    const data = await fetchWeather(lat, lon, tripDate);
    data.cityName = name;
    data.countryName = countryName;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/image", async (req, res) => {
  const { placename } = req.query;

  try {
    const data = await fetchLocationImage(placename);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.errorCode).json({ error: error.message });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, () => {
  console.log("listening on port 8000!");
});
