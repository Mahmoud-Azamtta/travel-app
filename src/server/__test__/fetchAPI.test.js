const axios = require("axios");
const {
  fetchWeather,
  fetchCoordinates,
  fetchLocationImage,
} = require("../fetchAPI.js");

jest.mock("axios");

describe("fetchAPI tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchCoordinates should return coordinates data", async () => {
    const mockResponse = {
      data: {
        totalResultsCount: 1,
        geonames: [
          { lat: 40.7128, lng: -74.006, name: "New York", countryName: "USA" },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchCoordinates("New York");
    expect(result).toEqual({
      lat: 40.7128,
      lng: -74.006,
      name: "New York",
      countryName: "USA",
    });
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("geonames.org/searchJSON"),
      {
        params: {
          q: "New York",
          maxRows: 1,
          username: process.env.GEONAMES_USERNAME,
        },
      },
    );
  });

  test("fetchWeather should return weather data", async () => {
    const mockResponse = {
      data: {
        data: [
          {
            temp: 20,
            weather: { description: "Clear" },
            app_max_temp: 25,
            app_min_temp: 15,
            datetime: "2023-10-01",
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchWeather(40.7128, -74.006, "2023-10-01");
    expect(result).toEqual({
      temp: 20,
      weather: { description: "Clear" },
      max_temp: 25,
      min_temp: 15,
      date: "2023-10-01",
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("weatherbit.io"),
      {
        params: expect.objectContaining({
          lat: 40.7128,
          lon: -74.006,
          days: expect.any(Number),
          key: process.env.WEATHERBIT_KEY,
        }),
      },
    );
  });

  test("fetchLocationImage should return image data", async () => {
    const mockResponse = {
      data: {
        totalHits: 1,
        hits: [{ largeImageURL: "image_url", previewURL: "preview_url" }],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchLocationImage("New York");
    expect(result).toEqual({
      locationImage: "image_url",
      locationImagePreview: "preview_url",
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("pixabay.com"),
      {
        params: expect.objectContaining({
          q: "New York",
          key: process.env.PIXABAY_KEY,
        }),
      },
    );
  });

  test("fetchLocationImage should handle no images found", async () => {
    const mockResponse = { data: { totalHits: 0 } };

    axios.get.mockResolvedValue(mockResponse);

    await expect(fetchLocationImage("Unknown Place")).rejects.toThrow(
      "No images found",
    );
  });
});
