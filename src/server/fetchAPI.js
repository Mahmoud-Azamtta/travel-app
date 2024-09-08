const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const getDaysLeft = (arrivalDate) => {
  const timeLeft = new Date(arrivalDate).getTime() - new Date().getTime();

  const msecPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil(timeLeft / msecPerDay);
};

const fetchWeather = async (lat, lon, tripDate) => {
  let baseURL = "https://api.weatherbit.io/v2.0/forecast/daily";
  const API_KEY = process.env.WEATHERBIT_KEY;
  const daysLeft = getDaysLeft(tripDate);

  const params = {
    key: API_KEY,
    units: "M",
    days: daysLeft,
    lat,
    lon,
  };

  try {
    const response = await axios.get(baseURL, { params });
    const forecast = response.data.data[response.data.data.length - 1];

    const { temp, weather, app_max_temp, app_min_temp, datetime } = forecast;

    return {
      temp,
      weather,
      max_temp: app_max_temp,
      min_temp: app_min_temp,
      date: datetime,
    };
  } catch (error) {
    throw new Error("Interal server error while getting weather");
  }
};

const fetchCoordinates = async (placename) => {
  const encodedLocation = encodeURIComponent(placename);
  const username = process.env.GEONAMES_USERNAME;
  const BASE_URL = `http://api.geonames.org/searchJSON`;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: encodedLocation,
        maxRows: 1,
        username,
      },
    });

    const { data } = response;
    if (data.totalResultsCount === 0) {
      const error = new Error("Location not found");
      error.errorCode = 404;
      throw error;
    }

    const { lat, lng, name, countryName } = data.geonames[0];
    return {
      lat,
      lng,
      name,
      countryName,
    };
  } catch (error) {
    if (error.errorCode) throw error;
    const serverError = new Error(
      "Internal server error while getting locaiton coordinates",
    );
    serverError.errorCode = 500;
    throw serverError;
  }
};

const fetchLocationImage = async (placename) => {
  const BASE_URL = "https://pixabay.com/api";
  const API_KEY = process.env.PIXABAY_KEY;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: placename,
        image_type: "photo",
        orientation: "vertical",
      },
    });
    if (response.data.totalHits === 0) {
      const error = new Error("No images found");
      error.errorCode = 404;
      throw error;
    }
    return {
      locationImage: response.data.hits[0].largeImageURL,
      locationImagePreview: response.data.hits[0].previewURL,
    };
  } catch (error) {
    if (error.errorCode) throw error;
    const serverError = new Error(
      "Internal server error while getting location's image",
    );
    serverError.errorCode = 500;
    throw serverError;
  }
};

module.exports = { fetchWeather, fetchCoordinates, fetchLocationImage };
