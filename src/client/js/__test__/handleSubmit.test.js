import axios from "axios";
import { handleSubmit } from "../formHandler";
import { renderResponse, saveResult, discardResult } from "../resultHandler";

jest.mock("axios");
jest.mock("../resultHandler.js");

describe("handleSubmit", () => {
  let event;

  beforeEach(() => {
    event = {
      preventDefault: jest.fn(),
    };

    document.body.innerHTML = `
      <form id="ta-form">
        <input id="location" value="New York"/>
        <div class="feedback location"></div>
        <input id="leaving-date" value="2024-09-24"/>
        <div class="feedback date"></div>
        <div class="feedback failure"></div>
        <div class="error-wrapper"></div>
        <div class="loader" style="visibility: hidden"></div>
      </form>
      <div class="details">
        <div class="buttons">
          <button type="button" id="discard">Discard</button>
          <button type="button" id="save">Save</button>
        </div>
      </div>
    `;

    jest.clearAllMocks();
  });

  test("should submit form, fetch data, and render response successfully", async () => {
    const mockWeatherResponse = { data: { weather: "sunny", temp: 25 } };
    const mockImageResponse = {
      data: { imageUrl: "http://example.com/image.jpg" },
    };

    axios.post.mockResolvedValue(mockWeatherResponse);
    axios.get.mockResolvedValue(mockImageResponse);

    await handleSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/weather",
      {
        placename: "New York",
        tripDate: "2024-09-24",
      },
    );
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/image", {
      params: { placename: "New York" },
    });
    expect(renderResponse).toHaveBeenCalledWith({
      weather: "sunny",
      temp: 25,
      imageUrl: "http://example.com/image.jpg",
    });
  });

  test("should show error feedback if location is invalid", async () => {
    document.querySelector("#location").value = "city123";

    await handleSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
    expect(document.querySelector(".feedback.location").innerHTML).toBe(
      '<p class="feedback-error">Invalid location name</p>',
    );
  });

  test("should display error message on API failure", async () => {
    axios.post.mockRejectedValue({ status: 404 });

    await handleSubmit(event);

    expect(document.querySelector(".feedback.failure").innerHTML).toContain(
      "Location not found",
    );
  });

  test("should add event listeners to save and discard buttons", async () => {
    const mockWeatherResponse = { data: { weather: "sunny", temp: 25 } };
    const mockImageResponse = {
      data: { imageUrl: "http://example.com/image.jpg" },
    };

    axios.post.mockResolvedValue(mockWeatherResponse);
    axios.get.mockResolvedValue(mockImageResponse);

    await handleSubmit(event);

    document.querySelector("button#save").click();
    expect(saveResult).toHaveBeenCalledWith({
      weather: "sunny",
      temp: 25,
      imageUrl: "http://example.com/image.jpg",
    });

    document.querySelector("button#discard").click();
    expect(discardResult).toHaveBeenCalled();
  });
});
