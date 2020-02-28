const LogTalk = require("../src/index");
const logger = new LogTalk();

// Default methods
logger.debug("This is debug");
logger.info("This is info");
logger.success("This is success");
logger.warn("This is warn");
logger.error("This is error");

describe("Invalid argument of setMethod", () => {
  function getSetMethodErrMsg(option) {
    let err = "";
    try {
      logger.setMethod(option);
    } catch (e) {
      err = e.message;
    }
    return err;
  }

  let expected;
  let actual;

  it("Should return error when name is reserved", () => {
    expected = LogTalk.ERR_METHOD_NAME_RESERVED;
    actual = getSetMethodErrMsg({ name: "setMethod" });
    expect(expected).toEqual(actual);
  });

  it("Should return error when argument is not object", () => {
    expected = LogTalk.ERR_INVALID_ARGUMENT;
    actual = getSetMethodErrMsg();
    expect(expected).toEqual(actual);

    actual = getSetMethodErrMsg(1);
    expect(expected).toEqual(actual);
  });
});
