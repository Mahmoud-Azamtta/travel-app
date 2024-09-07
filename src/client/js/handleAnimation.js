const handleAnimation = () => {
  const resultCard = document.querySelector("section");
  const form = document.querySelector("form");

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      form.classList.add("loaded");
      resultCard.classList.add("loaded");
    }, 10);
  });
};

export { handleAnimation };
