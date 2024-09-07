import axios from "axios";
import { isValidDate } from "./validateDate";
import { isValidLocation } from "./validateLocationName";

const setLoading = (show) => {
  const loader = document.querySelector(".loader");

  loader.style.visibility = show ? "visible" : "hidden";
};

const handleError = (show, msg) => {
  const error = document.querySelector(".error-wrapper");

  error.innerHTML = `<p>${msg}</p>`;
  error.style.display = show ? "block" : "none";
};

const renderResponse = (data) => {
  const result = document.getElementById("location-wrapper");

  if (!data) {
    handleError(true, "Interal server error");
    return;
  }

  if (data?.error) {
    handleError(true, data.error);
    return;
  }

  result.innerHTML = `
    <div class="details">
      <h3>${data.cityName} - ${data.countryName}</h3>
      <p class="date">Date: ${data.date}</p>
      <div id="forecast">
        <h4>Weather Forecast</h4>
        <div class="weather">
          <img
            class="weather-icon"
            src="https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png"
            alt=""
          />
          <p class="center"><em>${data.weather.description}</em></p>
        </div>
        <div class="temp">
          <p>Temp: <strong>${data.temp}°</strong></p>
          ${data.max_temp ? `<p><strong>${data.max_temp}°</strong></p>` : ""}
          ${data.min_temp ? `<p><strong>${data.min_temp}°</strong></p>` : ""}
        </div>
      </div>
      <div class="buttons">
        <button type="button" id="discard">Discard</button>
        <button type="button" id="save">Save</button>
      </div>
    </div>
    <div id="location-image">
      <img
        src="${data.locationImage}"
        alt="city picture"
      />
    </div>
  `;
};

const isValidForm = (location, date) => {
  let isValid = true;

  const locationFeedback = document.querySelector(".feedback.location");
  const dateFeedback = document.querySelector(".feedback.date");

  locationFeedback.innerHTML = "";
  dateFeedback.innerHTML = "";

  if (!isValidLocation(location)) {
    locationFeedback.innerHTML =
      "<p class='feedback-error'>Invalid location name</p>";
    isValid = false;
  }

  if (!isValidDate(date)) {
    locationFeedback.innerHTML = "<p class='feedback-error'>Invalid date</p>";
    isValid = false;
  }

  return isValid;
};

// Function to send data to the server
const handleSubmit = async (event) => {
  event.preventDefault();

  const BASE_URL = "http://localhost:8000/api";

  const locationInput = document.querySelector("#ta-form #location");
  const dateInput = document.querySelector("#ta-form #leaving-date");
  const feedback = document.querySelector("#ta-form .feedback.failure");

  feedback.innerHTML = "";
  handleError(false, "");

  const isValid = isValidForm(locationInput.value, dateInput.value);

  if (!isValid) return;

  setLoading(true);
  try {
    const weatherResponse = await axios.post(`${BASE_URL}/weather`, {
      placename: locationInput.value,
      arrivalDate: dateInput.value,
    });
    const imageResponse = await axios.get(`${BASE_URL}/image`, {
      params: {
        placename: `${weatherResponse.data.cityName} - ${weatherResponse.data.countryName}`,
      },
    });

    const data = {
      ...weatherResponse.data,
      ...imageResponse.data,
    };
    console.log(data);
    renderResponse(data);
    feedback.innerHTML =
      "<p class='feedback-success'>Found the location you searched for!</p>";
  } catch (error) {
    if (error.status === 404) {
      feedback.innerHTML = `<p class='feedback-error'>Location not found</p>`;
    } else {
      feedback.innerHTML = `<p class='feedback-error'>Unknow error occured, try again!</p>`;
    }
  } finally {
    setLoading(false);
  }
};

// Export the handleSubmit function
export { handleSubmit };
