const LogTalk = require("../src/index");
logger = new LogTalk();

// Default methods
logger.debug("This is debug");
logger.info("This is info", { message: "Hello" });
logger.success("This is success");
logger.warn("This is warn");
logger.error("This is error", new Error("There is something wrong"));

// Define your own method
logger.setMethod({ name: "foo", color: "yellow", timeFormat: "YYYY-MM-DD" });
logger.foo("Foo");

// Override default methods
logger.setMethod({ name: "info", label: "[INFO]", color: "red" });
