const isValidLocation = (locationName) => {
  const pattern = /^[a-zA-Z\s]+$/;

  return pattern.test(locationName);
};

export { isValidLocation };
