const dayjs = require("dayjs");
class HappyLogger {
  static get LOGGING_METHODS() {
    return [
      {
        name: "debug",
        level: 1,
        color: "default",
        output: console.log,
      },
      {
        name: "info",
        level: 2,
        color: "blue",
        output: console.log,
      },
      {
        name: "success",
        level: 3,
        color: "green",
        output: console.log,
      },
      {
        name: "warn",
        level: 4,
        color: "yellow",
        output: console.warn || console.log,
      },
      {
        name: "error",
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
      timeFormat: "YYYY-MM-DD HH:mm:ss",
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
    this.__option = { ...HappyLogger.DEFAULT_LOGGING_METHOD, ...option };
    this.__level = level;
    this.__loggingMethods = {};
    HappyLogger.LOGGING_METHODS.forEach(this.setMethod.bind(this));
  }

  highlight(timestamp, label, color) {
    // For terminal
    if (typeof window === 'undefined') {
      return [timestamp, HappyLogger.TERMINAL_COLOR[color] + label + HappyLogger.TERMINAL_COLOR.default];
    }
    // For ie
    if (window.navigator.userAgent.match(/(T|t)rident/)) {
      return [timestamp, label];
    }
    return [`${timestamp} %c${label}`, `color: ${HappyLogger.BROWSER_COLOR[color]}`];
  }

  onMatch(reg, callback) {
    if (typeof callback !== "function") {
      throw new Error("Invalid callback function");
    }
    Object.keys(this.__loggingMethods).forEach(key => {
      const method = this.__loggingMethods[key];
      this.__loggingMethods[key] = function() {
        const args = Array.from(arguments);
        const matched = args.filter(arg => String(arg).match(reg));
        if (matched.length > 0) callback();
        method.apply(this, arguments);
      };
    });
  }

  setMethod(method) {
    if (typeof method !== "object") {
      throw new Error("Invalid method");
    }
    method = { ...this.__option, ...method };
    const { name, level, timeFormat, output, color } = method;
    if (typeof name !== "string") {
      throw new Error("Invalid method name");
    }
    switch (name) {
      case "highlight":
      case "onMatch":
      case "setMethod":
      case "":
        throw new Error("Invalid method name");
    }
    if (!this.__level || level < this.__level) return false;
    this.__loggingMethods[name] = this[name] = function() {
      const timestamp = dayjs().format(timeFormat);
      const args = this.highlight(timestamp, name, color);
      output.call(this, ...args, ...arguments);
    };
  }
};

module.exports = HappyLogger;
