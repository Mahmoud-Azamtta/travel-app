import { handleAnimation } from "./handleAnimation";
import { renderTripList, handleDeleteTrip } from "./tripListHandler";

const main = () => {
  renderTripList();
  handleAnimation();
  handleDeleteTrip();
};

export { main };
