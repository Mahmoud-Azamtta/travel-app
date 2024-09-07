const isValidDate = (date) => {
  const checkDate = new Date(date);

  return checkDate instanceof Date && !isNaN(checkDate);
};

export { isValidDate };
