import { isValidLocation } from "../validateLocationName";

describe("isValidLocation", () => {
  test("should return true for valid location names with only letters", () => {
    expect(isValidLocation("Amman")).toBe(true);
    expect(isValidLocation("Istanbul")).toBe(true);
  });

  test("should return true for valid location names with spaces", () => {
    expect(isValidLocation("Los Angeles")).toBe(true);
    expect(isValidLocation("San Francisco")).toBe(true);
  });

  test("should return false for location names containing numbers", () => {
    expect(isValidLocation("Jenin123")).toBe(false);
    expect(isValidLocation("New York 2")).toBe(false);
  });

  test("should return false for location names containing special characters", () => {
    expect(isValidLocation("Bali!")).toBe(false);
    expect(isValidLocation("Somewhere@")).toBe(false);
  });

  test("should return false for location names that are empty strings", () => {
    expect(isValidLocation("")).toBe(false);
  });

  test("should return false for location names containing only spaces", () => {
    expect(isValidLocation("     ")).toBe(false);
  });

  test("should return false for location names with non-alphabetical characters", () => {
    expect(isValidLocation("Berlin123!")).toBe(false);
  });

  test("should return true for location names with mixed case letters", () => {
    expect(isValidLocation("london")).toBe(true);
    expect(isValidLocation("CAIRO")).toBe(true);
  });

  test("should return true for a single valid word", () => {
    expect(isValidLocation("Tokyo")).toBe(true);
  });
});
