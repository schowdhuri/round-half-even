const isEven = (d: number) => d % 2 === 0;
const MAX_DECIMALS_ALLOWED = 20;

/**
 * Round Half-Even (Banker's Rounding) Utility
 * https://en.wikipedia.org/wiki/Rounding#Round_half_to_even
 *
 * @param value - the value to operate on
 * @param numDecimals - number of decimal places
 * @returns `value` rounded to `numDecimal` places
 */
function roundHalfEven(value: number, numDecimals = 2): number {
  if (typeof value === "undefined") {
    throw new Error("value is required");
  }
  if (typeof value !== "number") {
    throw new Error("value must be a number type");
  }
  if (value < 0) {
    return -roundHalfEven(-value, numDecimals);
  }
  if (numDecimals === 0) {
    return roundHalfEven(value / 10, 1) * 10;
  }
  if (numDecimals > MAX_DECIMALS_ALLOWED) {
    throw new Error(`Cannot handle more than ${MAX_DECIMALS_ALLOWED} decimals`);
  }
  // convert to string; remove trailing 0s
  const isExponentialForm =
    value.toString().includes("e") || value.toString().includes("E");
  const strNum = (
    isExponentialForm
      ? value.toFixed(MAX_DECIMALS_ALLOWED).toString()
      : value.toString()
  ).replace(/0+$/, "");
  const decimalIndex = strNum.indexOf(".");
  if (decimalIndex < 0) {
    // no fractional part
    return value;
  }
  let intPart = strNum.slice(0, decimalIndex);
  if (intPart.length == 0) {
    intPart = "0";
  }
  let fractPart = strNum.slice(decimalIndex + 1); // extract fractional part
  if (fractPart.length < numDecimals) {
    return value;
  }
  const followingDig = parseInt(fractPart[numDecimals], 10);
  if (followingDig < 5) {
    // rounding not required
    const newFractPart = fractPart.slice(0, numDecimals);
    return parseFloat(`${intPart}.${newFractPart}`);
  }
  if (followingDig === 5) {
    const newFractPart = fractPart.slice(0, numDecimals + 1);
    if (parseInt(fractPart.slice(numDecimals + 1), 10) > 0) {
      fractPart = `${newFractPart}9`;
    } else {
      fractPart = newFractPart;
    }
  }
  let nextDig = parseInt(fractPart[fractPart.length - 1], 10);
  let carriedOver = 0;
  for (let ptr = fractPart.length - 1; ptr >= numDecimals; ptr--) {
    let dig = parseInt(fractPart[ptr - 1], 10) + carriedOver;
    if (nextDig > 5 || (nextDig == 5 && !isEven(dig))) {
      ++dig;
    }
    if (dig > 9) {
      dig -= 10;
      carriedOver = 1;
    } else {
      carriedOver = 0;
    }
    nextDig = dig;
  }
  let newFractPart = "";
  for (let ptr = numDecimals - 2; ptr >= 0; ptr--) {
    let d = parseInt(fractPart[ptr], 10) + carriedOver;
    if (d > 9) {
      d -= 10;
      carriedOver = 1;
    } else {
      carriedOver = 0;
    }
    newFractPart = `${d}${newFractPart}`;
  }
  const output = parseInt(intPart, 10) + carriedOver;
  return parseFloat(`${output}.${newFractPart}${nextDig}`);
};

export default roundHalfEven