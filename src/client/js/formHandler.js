import axios from "axios";
import { isValidDate } from "./validateDate";
import { isValidLocation } from "./validateLocationName";
import { renderResponse, saveResult, discardResult } from "./resultHandler";

const setLoading = (show) => {
  const loader = document.querySelector(".loader");

  loader.style.visibility = show ? "visible" : "hidden";
};

const handleError = (show, msg) => {
  const error = document.querySelector(".error-wrapper");

  error.innerHTML = `<p>${msg}</p>`;
  error.style.display = show ? "block" : "none";
};

const setFeedbackMessage = (message, isSuccess) => {
  const feedback = document.querySelector("#ta-form .feedback.failure");

  feedback.innerHTML = `<p class='${isSuccess ? "feedback-success" : "feedback-error"}'>${message}</p>`;
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

const fetchData = async (placename, tripDate) => {
  const BASE_URL = "http://localhost:8000/api";
  console.log(placename, tripDate);

  try {
    const [weatherResponse, imageResponse] = await Promise.all([
      axios.post(`${BASE_URL}/weather`, {
        placename,
        tripDate,
      }),
      axios.get(`${BASE_URL}/image`, {
        params: {
          placename,
        },
      }),
    ]);

    return { ...weatherResponse.data, ...imageResponse.data };
  } catch (error) {
    throw error.status === 404
      ? "Location not found"
      : "Unknow error occured, try again!";
  }
};

// Function to send data to the server
const handleSubmit = async (event) => {
  event.preventDefault();

  const locationInput = document.querySelector("#ta-form #location");
  const dateInput = document.querySelector("#ta-form #leaving-date");

  setFeedbackMessage("", true);
  handleError(false, "");

  const isValid = isValidForm(locationInput.value, dateInput.value);

  if (!isValid) return;

  setLoading(true);
  try {
    const data = await fetchData(locationInput.value, dateInput.value);

    if (!data) {
      handleError(true, "Interal server error");
      return;
    }

    if (data?.error) {
      handleError(true, data.error);
      return;
    }

    renderResponse(data);
    setFeedbackMessage("Found the location you searched for!", true);

    const saveBtn = document.querySelector("button#save");
    const discardBtn = document.querySelector("button#discard");

    saveBtn.addEventListener("click", () => saveResult(data));
    discardBtn.addEventListener("click", discardResult);
  } catch (error) {
    setFeedbackMessage(error, false);
  } finally {
    setLoading(false);
  }
};

// Export the handleSubmit function
export { handleSubmit };
