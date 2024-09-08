const isValidDate = (date) => {
  const checkDate = new Date(date);

  let isValid = checkDate instanceof Date && !isNaN(checkDate);
  return isValid && checkDate > new Date();
};

export { isValidDate };
