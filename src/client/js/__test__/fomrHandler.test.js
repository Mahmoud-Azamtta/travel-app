import {
  handleSubmit,
  setLoading,
  setFeedbackMessage,
  fetchData,
  handleError,
  isValidForm,
} from "../formHandler";
import { isValidLocation } from "../validateLocationName";
import { isValidDate } from "../validateDate";
import axios from "axios";

test("setLoading shows and hides the loader correctly", () => {
  document.body.innerHTML =
    "<div class='loader' style='visibility: hidden'></div>";

  setLoading(true);
  expect(document.querySelector(".loader").style.visibility).toBe("visible");

  setLoading(false);
  expect(document.querySelector(".loader").style.visibility).toBe("hidden");
});

test("handleError displays the correct error message", () => {
  document.body.innerHTML =
    "<div class='error-wrapper' style='display: none'></div>";

  handleError(true, "some sort of error occured");
  const error = document.querySelector(".error-wrapper");
  expect(error.style.display).toBe("block");
  expect(error.innerHTML).toBe("<p>some sort of error occured</p>");

  handleError(false, "");
  expect(error.style.display).toBe("none");
});

test("setFeedbackMessage sets success of error messages", () => {
  document.body.innerHTML = `
    <form id="ta-form">
      <div class="feedback failure"></div>
    </form>
  `;

  const feedback = document.querySelector(".feedback.failure");
  setFeedbackMessage("Success", true);
  expect(feedback.innerHTML).toBe('<p class="feedback-success">Success</p>');

  setFeedbackMessage("Error", false);
  expect(feedback.innerHTML).toBe('<p class="feedback-error">Error</p>');
});

jest.mock("../validateDate.js");
jest.mock("../validateLocationName.js");

test("isValidForm check the validity of location and date", () => {
  document.body.innerHTML = `
    <div class="feedback location"></div>
    <div class="feedback date"></div>
  `;

  const locationFeedback = document.querySelector(".feedback.location");
  const dateFeedback = document.querySelector(".feedback.date");

  isValidLocation.mockReturnValue(false);
  isValidDate.mockReturnValue(true);

  let isValid = isValidForm("city123", "2024-09-10");

  expect(isValid).toBe(false);
  expect(locationFeedback.innerHTML).toBe(
    `<p class="feedback-error">Invalid location name</p>`,
  );

  isValidLocation.mockReturnValue(true);
  isValidDate.mockReturnValue(false);

  isValid = isValidForm("Amman", "2024-09-01");

  expect(isValid).toBe(false);
  expect(dateFeedback.innerHTML).toBe(
    `<p class="feedback-error">Invalid date</p>`,
  );
});

jest.mock("axios");

describe("fetchData", () => {
  it("should fetch weather and image data correctly", async () => {
    const mockWeatherResponse = { data: { weather: "sunny", temp: 25 } };
    const mockImageResponse = {
      data: { imageUrl: "http://example.com/image.jpg" },
    };

    axios.post.mockResolvedValue(mockWeatherResponse);
    axios.get.mockResolvedValue(mockImageResponse);

    const data = await fetchData("New York", "2024-09-10");

    expect(data).toEqual({
      weather: "sunny",
      temp: 25,
      imageUrl: "http://example.com/image.jpg",
    });
  });

  it('should handle 404 error and throw "Location not found"', async () => {
    axios.post.mockRejectedValue({ status: 404 });

    await expect(fetchData("InvalidLocation", "2024-09-10")).rejects.toBe(
      "Location not found",
    );
  });

  it('should handle other errors and throw "Unknown error occurred, try again!"', async () => {
    axios.post.mockRejectedValue({ status: 500 });

    await expect(fetchData("New York", "2024-09-10")).rejects.toBe(
      "Unknown error occured, try again!",
    );
  });
});
