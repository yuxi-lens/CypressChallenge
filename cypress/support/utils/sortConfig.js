export const SORT_CONFIGS = {
  Price: {
    locator: "priceLabels",
    parser: (text) => parseFloat(text.match(/\d+/)[0]),
    orders: {
      "low to high": (a, b) => a >= b,
      "high to low": (a, b) => a <= b,
    },
  },
  Name: {
    locator: "productName",
    parser: (text) => text.trim(),
    orders: {
      "A to Z": (a, b) => a.localeCompare(b) >= 0,
      "Z to A": (a, b) => a.localeCompare(b) <= 0,
    },
  },
};
