import { renderResponse, discardResult, saveResult } from "../resultHandler";

document.body.innerHTML = `
  <form id="ta-form">
    <input id="location" />
    <div class="feedback loaction"></div>
    <input id="leaving-date" />
    <div class="feedback date"></div>
    <div class="feedback failure"></div>
  </form>
  <div id="location-wrapper"></div>
  <div id="trip-list"></div>
`;

const mockData = {
  cityName: "Amman",
  countryName: "Jordan",
  date: "2024-09-01",
  weather: {
    icon: "r01d",
    description: "Light rain",
  },
  temp: 23,
  max_temp: 25,
  min_temp: 20,
  locationImage: "https://example.com/nyc.jpg",
};

describe("renderResponse function", () => {
  test("should render the response with correct data", () => {
    renderResponse(mockData);

    expect(document.querySelector("h3").innerHTML).toBe("Amman - Jordan");
    expect(document.querySelector(".details p.date").innerHTML).toBe(
      "Date: 2024-09-01",
    );
    expect(document.querySelector(".weather-icon").src).toContain("r01d.png");

    const tempArray = document.querySelectorAll(".temp strong");
    expect(tempArray[0].innerHTML).toBe("23°");
    expect(tempArray[1].innerHTML).toBe("25°");
    expect(tempArray[2].innerHTML).toBe("20°");
  });
});

describe("discardResult function", () => {
  test("should reset the form and result area", () => {
    const locationInput = document.getElementById("location");
    const dateInput = document.getElementById("leaving-date");
    locationInput.value = "Some location";
    dateInput.value = "2024-09-01";

    discardResult();

    expect(locationInput.value).toBe("");
    expect(dateInput.value).toBe("");
    const wrapper = document.getElementById("location-wrapper");
    expect(wrapper.innerHTML).toBe(
      '<p class="empty">Didn\'t provide a location yet</p>',
    );
  });
});

describe("saveResult function", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should save the trip to localStorage and reset form and result", () => {
    saveResult(mockData);

    const savedTrips = JSON.parse(localStorage.getItem("saved_trips"));
    expect(savedTrips).toHaveLength(1);
    expect(savedTrips[0].cityName).toBe("Amman");

    const locationInput = document.getElementById("location");
    const dateInput = document.getElementById("leaving-date");

    expect(locationInput.value).toBe("");
    expect(dateInput.value).toBe("");

    const wrapper = document.getElementById("location-wrapper");
    expect(wrapper.innerHTML).toBe(
      '<p class="empty">Didn\'t provide a location yet</p>',
    );
  });

  test("should append the new trip to localStorage if there are already trips", () => {
    const existingTrips = [
      {
        cityName: "Jenin",
        countryName: "Palestine",
        date: "2024-09-10",
        weather: {
          icon: "r01d",
          description: "Light rain",
        },
        temp: 32,
        max_temp: 35,
        min_temp: 30,
        locationImage: "https://example.com/nyc.jpg",
      },
    ];
    localStorage.setItem("saved_trips", JSON.stringify(existingTrips));

    saveResult(mockData);

    const savedTrips = JSON.parse(localStorage.getItem("saved_trips"));
    expect(savedTrips).toHaveLength(2);
    expect(savedTrips[0].cityName).toBe("Jenin");
    expect(savedTrips[1].cityName).toBe("Amman");
  });
});
