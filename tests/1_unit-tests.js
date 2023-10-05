const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input.', () => {
    assert.strictEqual(convertHandler.getNum("10km"), 10);
  })

  test('convertHandler should correctly read a decimal number input.', () => {
    assert.strictEqual(convertHandler.getNum("1.1km"), 1.1)
  })

  test('convertHandler should correctly read a fractional input.', () => {
    assert.strictEqual(convertHandler.getNum("1/5km"), 0.2)
  })

  test('convertHandler should correctly read a fractional input with a decimal.', () => {
    assert.strictEqual(convertHandler.getNum("0.1/5km"), 0.02)
  })

  test('convertHandler should correctly return an error on a double-fraction', () => {
    assert.isUndefined(convertHandler.getNum("3/2/3km"))
  })

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
    assert.strictEqual(convertHandler.getNum("km"), 1)
  })

  test('convertHandler should correctly read each valid input unit.', () => {
    assert.strictEqual(convertHandler.getUnit("1.2km"), "km")
  })

  test('convertHandler should correctly return an error for an invalid input unit.', () => {
    assert.isUndefined(convertHandler.getUnit("3/2kilo"))
  })

  test('convertHandler should return the correct return unit for each valid input unit.', () => {
    assert.strictEqual(convertHandler.getReturnUnit("mi"), "km")
  })

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
    assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers")
  })

  test('convertHandler should correctly convert gal to L', () => {
    assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541)
  })

  test('convertHandler should correctly convert L to gal.', () => {
    assert.strictEqual(convertHandler.convert(1, "L"), 0.26417)
  })

  test('convertHandler should correctly convert mi to km.', () => {
    assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934)
  })

  test('convertHandler should correctly convert km to mi', () => {
    assert.strictEqual(convertHandler.convert(1, "km"), 0.62137)
  })

  test('convertHandler should correctly convert lbs to kg.', () => {
    assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359)
  })

  test('convertHandler should correctly convert kg to lbs.', () => {
    assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462)
  })
});