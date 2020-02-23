const dayjs = require("dayjs");
class LogTalk {
  static get LOGGING_METHODS() {
    return [
      {
        name: "debug",
        label: "[DEBUG]",
        level: 1,
        color: "default",
        output: console.log,
      },
      {
        name: "info",
        label: "[INFO]",
        level: 2,
        color: "blue",
        output: console.log,
      },
      {
        name: "success",
        label: "[SUCCESS]",
        level: 3,
        color: "green",
        output: console.log,
      },
      {
        name: "warn",
        label: "[WARN]",
        level: 4,
        color: "yellow",
        output: console.warn || console.log,
      },
      {
        name: "error",
        label: "[ERROR]",
        level: 5,
        color: "red",
        output: console.error || console.log,
      },
    ];
  };

  static get DEFAULT_LOGGING_METHOD() {
    return {
      level: 1,
      color: "default",
      output: console.log,
      timeFormat: "[[]YYYY-MM-DD HH:mm:ss]",
    };
  };

  static get BROWSER_COLOR() {
    return {
      red: "#BD2130",
      yellow: "#D39E00",
      green: "#1E7E34",
      blue: "#117A8B",
      default: "inherit",
    };
  };

  static get TERMINAL_COLOR() {
    return {
      red: "\u001b[91m",
      yellow: "\u001b[93m",
      green: "\u001b[92m",
      blue: "\u001b[94m",
      default: "\u001b[0m",
    };
  };

  constructor(level = 1, option = {}) {
    this.__option = { ...LogTalk.DEFAULT_LOGGING_METHOD, ...option };
    this.__level = level;
    LogTalk.LOGGING_METHODS.forEach(this.setMethod.bind(this));
  }

  highlight(timestamp, label, color) {
    // For terminal
    if (typeof window === 'undefined') {
      return [timestamp, LogTalk.TERMINAL_COLOR[color] + label + LogTalk.TERMINAL_COLOR.default];
    }
    // For ie
    if (window.navigator.userAgent.match(/(T|t)rident/)) {
      return [timestamp, label];
    }
    return [`${timestamp} %c${label}`, `color: ${LogTalk.BROWSER_COLOR[color]}`];
  }

  setMethod(method) {
    if (typeof method !== "object") {
      throw new Error("Invalid method");
    }
    method = { ...this.__option, ...method };
    const { name, label, level, timeFormat, output, color } = method;
    if (typeof name !== "string") {
      throw new Error("Invalid method name");
    }
    switch (name) {
      case "highlight":
      case "setMethod":
        throw new Error("Method name is reserved");
      case "":
        throw new Error("Method name is empty");
    }
    if (typeof console === 'undefined') return false;
    if (!this.__level || level < this.__level) return false;
    const timestamp = dayjs().format(timeFormat);
    const args = this.highlight(timestamp, typeof label !== 'undefined' ? label : name, color);
    this[name] = output.bind(console, ...args);
  }
};

module.exports = LogTalk;
