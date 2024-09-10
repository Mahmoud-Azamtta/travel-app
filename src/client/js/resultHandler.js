import { renderTripList } from "./tripListHandler";

const renderResponse = (data) => {
  const result = document.getElementById("location-wrapper");

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
          <p>Max Temp: <strong>${data.max_temp}°</strong></p>
          <p>Min Temp: <strong>${data.min_temp}°</strong></p>
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

const resetForm = () => {
  const locationInput = document.querySelector("#ta-form #location");
  const dateInput = document.querySelector("#ta-form #leaving-date");
  const feedback = document.querySelector("#ta-form .feedback.failure");

  locationInput.value = null;
  dateInput.value = null;
  feedback.innerHTML = "";
};

const resetResult = () => {
  const wrapper = document.getElementById("location-wrapper");
  wrapper.innerHTML = '<p class="empty">Didn\'t provide a location yet</p>';
};

const discardResult = () => {
  resetResult();
  resetForm();
};

const saveResult = (data) => {
  let savedTrips = localStorage.getItem("saved_trips");
  savedTrips = savedTrips ? JSON.parse(savedTrips) : [];
  savedTrips.push(data);
  localStorage.setItem("saved_trips", JSON.stringify(savedTrips));

  resetResult();
  resetForm();
  renderTripList();
};

export { renderResponse, discardResult, saveResult };
