const { isValidURL } = require("../validateURL");

describe("urlValidity", () => {
  test("test if strings are false urls", () => {
    expect(isValidURL("hello-world")).toBeFalsy();
  });

  test("emails are not considered valid urls", () => {
    expect(isValidURL("mailto:me@gmail.com")).toBeFalsy();
  });

  test("expect urls to be true", () => {
    expect(isValidURL("https://github.com/Mahmoud-Azamtta")).toBeTruthy();
  });

  test("expect empty string to be falsy", () => {
    expect(isValidURL("")).toBeFalsy();
  });
});
