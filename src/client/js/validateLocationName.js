const isValidLocation = (locationName) => {
  const pattern = /^[a-zA-Z\s]+$/;

  return pattern.test(locationName.trim());
};

export { isValidLocation };
