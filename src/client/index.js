// scss files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/section.scss";
import "./styles/header.scss";
import "./styles/location-search.scss";
import "./styles/trip-list.scss";
// js files
import { handleSubmit } from "./js/formHandler";
import { handleAnimation } from "./js/handleAnimation";
import { renderTripList, handleDeleteTrip } from "./js/tripListHandler";

renderTripList();
handleAnimation();
handleDeleteTrip();

export { handleSubmit };
