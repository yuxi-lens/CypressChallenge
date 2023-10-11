export function extractNumericValue(text) {
  return parseFloat(text.match(/\d+\.\d+/)[0]);
}
