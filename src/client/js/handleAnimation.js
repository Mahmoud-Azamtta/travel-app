import airplaneImage from "../assets/airplane.svg";
import airplaneFlippedImage from "../assets/airplane-fliped.svg";

const handleAnimation = () => {
  const resultCard = document.querySelector("section");
  const form = document.querySelector("form");

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      form.classList.add("loaded");
      resultCard.classList.add("loaded");
      document.querySelector(".plane.left-to-right img").src = airplaneImage;
      document.querySelector(".plane.right-to-left img").src =
        airplaneFlippedImage;
    }, 10);
  });
};

export { handleAnimation };
