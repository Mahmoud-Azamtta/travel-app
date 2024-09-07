const isValidLocation = (locationName) => {
  const pattern = /^[a-zA-Z\s]+$/;

  console.log(pattern.test(locationName));
  return pattern.test(locationName);
};

export { isValidLocation };
