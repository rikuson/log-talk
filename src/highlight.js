const BROWSER_COLOR = {
  red: "#BD2130",
  yellow: "#D39E00",
  green: "#1E7E34",
  blue: "#117A8B",
  default: "inherit",
};

const TERMINAL_COLOR = {
  red: "\u001b[91m",
  yellow: "\u001b[93m",
  green: "\u001b[92m",
  blue: "\u001b[94m",
  default: "\u001b[0m",
};

module.exports = (timestamp, label, color) => {
  // For terminal
  if (typeof window === "undefined") {
    return [timestamp, TERMINAL_COLOR[color] + label + TERMINAL_COLOR.default];
  }
  // For ie
  if (window.navigator.userAgent.match(/(T|t)rident/)) {
    return [timestamp, label];
  }
  return [`${timestamp} %c${label}`, `color: ${BROWSER_COLOR[color]}`];
};
