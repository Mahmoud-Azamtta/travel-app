import { isValidDate } from "../validateDate";

describe("isValidDate", () => {
  test("should return true for valid future dates", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Tomorrow's date

    expect(isValidDate(futureDate.toISOString())).toBe(true);
  });

  test("should return false for past dates", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // Yesterday's date

    expect(isValidDate(pastDate.toISOString())).toBe(false);
  });

  test("should return false for invalid date strings", () => {
    const invalidDate = "invalid-date-string";

    expect(isValidDate(invalidDate)).toBe(false);
  });

  test("should return false for current date", () => {
    const currentDate = new Date().toISOString(); // Current date

    expect(isValidDate(currentDate)).toBe(false);
  });

  test("should return false for an empty string", () => {
    expect(isValidDate("")).toBe(false);
  });

  test("should return false for a null value", () => {
    expect(isValidDate(null)).toBe(false);
  });

  test("should return false for a date object in the past", () => {
    const pastDate = new Date(2000, 0, 1); // January 1st, 2000

    expect(isValidDate(pastDate)).toBe(false);
  });

  test("should return true for a future date object", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1); // One year from now

    expect(isValidDate(futureDate.toISOString())).toBe(true);
  });
});
