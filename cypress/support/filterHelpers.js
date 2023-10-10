export function getFilterConfig(order, locators) {
  const configs = {
    Price: {
      locator: locators.priceLabels,
      parser: (text) => parseFloat(text.match(/\d+(\.\d+)?/)[0]),
      comparator: (a, b) => a - b,
    },
    Name: {
      locator: locators.nameLabels,
      parser: (text) => text.trim(),
      comparator: (a, b) => a.localeCompare(b),
    },
  };
  const selectedConfigKey = Object.keys(configs).find((key) =>
    order.includes(key)
  );
  return configs[selectedConfigKey];
}
