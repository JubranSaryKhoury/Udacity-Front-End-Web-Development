// Jubran Khoury

import { isValidUrl } from "../js/urlChecker";

test("Validates correct URLs", () => {
  expect(isValidUrl("http://Jubran.com")).toBe(true);
  expect(isValidUrl("https://Khoury.com")).toBe(true);
  expect(isValidUrl("http://example.com/path")).toBe(true);
  expect(isValidUrl("localhost")).toBe(true);
  expect(isValidUrl("127.0.0.1")).toBe(true);
});

test("Invalidates incorrect URLs", () => {
  expect(isValidUrl("htp://example.com")).toBe(false);
  expect(isValidUrl("http://")).toBe(false);
  expect(isValidUrl("")).toBe(false);
  expect(isValidUrl("example")).toBe(false);
});
