const roundHalfEven = require("./index");

describe("Round Half-Even", () => {
  it("should round to the specified number of decimal places", () => {
    expect(roundHalfEven(1.234, 1)).toEqual(1.2);
  });

  it("should round to 2 decimals when numDecimals is omitted", () => {
    expect(roundHalfEven(12.345)).toEqual(12.34);
  });

  it("should throw an error when input value is not passed", () => {
    expect(() => {
      roundHalfEven();
    }).toThrowError("value is required");
  });

  it("should throw an error when input value is not a number type", () => {
    expect(() => {
      roundHalfEven("1400.16");
    }).toThrowError("value must be a number type");
  });

  it("should handle negative fractions", () => {
    expect(roundHalfEven(-1.2345, 2)).toEqual(-1.23);
  });

  it("should handle '5 case' [1]", () => {
    expect(roundHalfEven(100.435, 2)).toEqual(100.44); // odd-numbered digit, 3 gets bumped to 4
  });

  it("should handle '5 case' [2] ", () => {
    expect(roundHalfEven(100.465, 2)).toEqual(100.46); // even-numbered digit, 6 unchanged
  });

  it("should handle '5 case' [3] ", () => {
    expect(roundHalfEven(100.405, 2)).toEqual(100.4); // 0: digit unchanged
  });

  it("should work for integers", () => {
    expect(roundHalfEven(1234, 2)).toEqual(1234);
  });

  it("should work for negative integers", () => {
    expect(roundHalfEven(-1234, 2)).toEqual(-1234);
  });

  it("should work even if numDecimals > number of digits after decimal in the input", () => {
    expect(roundHalfEven(1.2, 4)).toEqual(1.2);
  });

  it("should handle 0 input value", () => {
    expect(roundHalfEven(0, 2)).toEqual(0);
  });

  it("should handle 0 decimal places [1]", () => {
    expect(roundHalfEven(1.234, 0)).toEqual(1);
  });

  it("should handle 0 decimal places [2]", () => {
    expect(roundHalfEven(2.9, 0)).toEqual(3);
  });

  it("should handle 0 decimal places [3]", () => {
    expect(roundHalfEven(2.5, 0)).toEqual(2);
  });

  it("should handle 0 decimal places [4]", () => {
    expect(roundHalfEven(3.5, 0)).toEqual(4);
  });

  it("should treat negative value of decimal places as 0", () => {
    expect(roundHalfEven(1.234, -2)).toEqual(1);
  });

  it("should handle 0 input value and 0 decimal places", () => {
    expect(roundHalfEven(0, 0)).toEqual(0);
  });
});
