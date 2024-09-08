const tripsWrapper = document.getElementById("trip-list");

const renderEmptyWrapper = () => {
  tripsWrapper.innerHTML = "<p class='empty'>No saved trips yet</p>";
};

const dateBasedSort = (list) => {
  return list.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const isPastTrip = (trip) => {
  return new Date(trip.date) <= new Date();
};

const splitTripList = (list) => {
  const pastTrips = [];
  const futureTrips = [];

  list.forEach((trip) => {
    if (isPastTrip(trip)) pastTrips.push(trip);
    else futureTrips.push(trip);
  });

  return { pastTrips, futureTrips };
};

const renderTrip = (trip, index, isPast = false) => {
  return `
    <div class="trip">
      <div class="image-wrapper">
        <img
          src="${trip.locationImagePreview}"
          alt="${trip.cityName} - ${trip.countryName}"
        />
      </div>
      <div class="location">
        <h5><strong>${trip.cityName} - ${trip.countryName}</strong></h5>
        <p class="trip-date">${trip.date} - ${isPast ? "<span class='past'>Past</span>" : ""}</p>
        <h6><strong>Forecast:</strong></h6>
        <div class="forecast">
          <div class="image-wrapper">
            <img
              class="weather-icon"
              src="https://www.weatherbit.io/static/img/icons/${trip.weather.icon}.png"
              alt="${trip.weather.description}"
            />
          </div>
          <div class="forecast-desc">
            <p>${trip.weather.description}</p>
            <p>Temp: <strong>${trip.temp}°</strong></p>
          </div>
        </div>
      </div>
      <button data-idx=${index} class="rm-btn" type="button">&#x2715;</button>
    </div>
  `;
};

const renderTripList = () => {
  let tripList = JSON.parse(localStorage.getItem("saved_trips"));
  let renderedTrips = "";

  if (tripList.length === 0) {
    renderEmptyWrapper();
    return;
  }

  let { pastTrips, futureTrips } = splitTripList(tripList);

  pastTrips = dateBasedSort(pastTrips);
  futureTrips = dateBasedSort(futureTrips);

  futureTrips.map(
    (trip, index) => (renderedTrips += renderTrip(trip, index, false)),
  );
  pastTrips.map(
    (trip, index) => (renderedTrips += renderTrip(trip, index, true)),
  );

  tripsWrapper.innerHTML = renderedTrips;
};

const deleteTrip = (idx) => {
  const tripList = JSON.parse(localStorage.getItem("saved_trips"));
  tripList.splice(idx, 1);
  localStorage.setItem("saved_trips", JSON.stringify(tripList));

  renderTripList();
};

const handleDeleteTrip = () => {
  tripsWrapper.addEventListener("click", (event) => {
    console.log("hello");
    console.log(event.target);
    if (event.target.classList.contains("rm-btn")) {
      const idx = event.target.dataset.idx;
      deleteTrip(idx);
    }
  });
};

export { renderTripList, handleDeleteTrip };
