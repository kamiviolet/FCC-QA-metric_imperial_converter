function ConvertHandler() {
  this.getNum = function(input) {
    let result;
    let validateDoubleFraction = input.match(/\//g);

    if (validateDoubleFraction && validateDoubleFraction.length > 1) {
      return;
    }

    if (!/^(\d)+/.test(input)) {
      return result = 1;
    }

    let indexOfUnit = input.split("").findIndex(w => /[a-z]/i.test(w));

    result = input.substring(0, indexOfUnit);

    if (/\//.test(result)) {
      let fraction = result.split("/");
      result = fraction[0] / fraction[1];
    }
    result = parseFloat(result);

    return +result.toFixed(5);
  }

  this.getUnit = function(input) {
    let result;
    let unit = input.match(/[a-z]+/gi);

    if (unit) {
      result = unit[0];
      let validate = /^(kg|lbs|km|mi|gal|l)$/i.test(result);
      if (!validate) {
        return;
      }
      result = /^l$/i.test(result) ? "L" : result.toLowerCase()
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result = "";
    if (initUnit == "mi") {
      result = "km";
    } else if (initUnit == "km") {
      result = "mi";
    } else if (initUnit == "gal") {
      result = "L";
    } else if (initUnit == "L") {
      result = "gal";
    } else if (initUnit == "lbs") {
      result = "kg";
    } else if (initUnit == "kg") {
      result = "lbs";
    } else {
      result = "invalid unit";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "litres";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    }
    return +result.toFixed(5);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);

    let result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;

    return result;
  };
}

module.exports = ConvertHandler;
