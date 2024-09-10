import { renderTripList, handleDeleteTrip } from "../tripListHandler";

document.body.innerHTML = `
  <div id="trip-list"></div>
`;

const mockTrip = {
  cityName: "New York",
  countryName: "USA",
  date: "2024-09-24",
  weather: {
    icon: "r01d",
    description: "Light rain",
  },
  temp: 23,
  locationImagePreview: "https://example.com/nyc-preview.jpg",
};

const pastTrip = {
  cityName: "Paris",
  countryName: "France",
  date: "2023-01-15",
  weather: {
    icon: "s01d",
    description: "Snow",
  },
  temp: -5,
  locationImagePreview: "https://example.com/paris-preview.jpg",
};

const setLocalStorageTrips = (trips) => {
  localStorage.setItem("saved_trips", JSON.stringify(trips));
};

describe("renderTripList function", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render 'No saved trips yet' when no trips are saved", () => {
    setLocalStorageTrips([]);
    renderTripList();

    const tripsWrapper = document.getElementById("trip-list");
    expect(tripsWrapper.innerHTML).toBe(
      '<p class="empty">No saved trips yet</p>',
    );
  });

  test("should render future and past trips in the correct order", () => {
    setLocalStorageTrips([mockTrip, pastTrip]);
    renderTripList();

    const tripsWrapper = document.getElementById("trip-list");
    const renderedTrips = tripsWrapper.innerHTML;

    expect(renderedTrips).toContain("New York - USA");
    expect(renderedTrips).toContain("Paris - France");
    expect(renderedTrips).toContain("Past");
  });

  test("should sort trips by date", () => {
    const earlierTrip = { ...mockTrip, date: "2024-09-15" };
    setLocalStorageTrips([mockTrip, earlierTrip]);

    renderTripList();

    const tripsWrapper = document.getElementById("trip-list");
    const renderedTrips = tripsWrapper.innerHTML;

    const firstTrip = renderedTrips.indexOf("2024-09-15");
    const secondTrip = renderedTrips.indexOf("2024-09-24");

    expect(firstTrip).toBeLessThan(secondTrip);
  });
});

describe("deleteTrip function", () => {
  beforeEach(() => {
    localStorage.clear();
    setLocalStorageTrips([mockTrip, pastTrip]);
    renderTripList();
    handleDeleteTrip();
  });

  test("should delete a trip from localStorage", () => {
    document.querySelector("#rm-btn-0").click();

    const savedTrips = JSON.parse(localStorage.getItem("saved_trips"));
    expect(savedTrips).toHaveLength(1);
    expect(savedTrips[0].cityName).toBe("Paris");
  });

  test("should re-render the trip list after deletion", () => {
    const tripsWrapper = document.getElementById("trip-list");
    document.querySelector("#rm-btn-1").click();

    expect(tripsWrapper.innerHTML).not.toContain("Paris - France");
    expect(tripsWrapper.innerHTML).toContain("New York - USA");
  });
});

describe("handleDeleteTrip function", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should listen for click events and delete the correct trip", () => {
    setLocalStorageTrips([mockTrip, pastTrip]);
    renderTripList();

    handleDeleteTrip();

    const deleteButton = document.querySelector("#rm-btn-1");

    deleteButton.click();

    const savedTrips = JSON.parse(localStorage.getItem("saved_trips"));
    expect(savedTrips).toHaveLength(1);
    expect(savedTrips[0].cityName).toBe("New York");
  });
});
