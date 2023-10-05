const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(7000);

  test('/api/convert?input=10L - GET - 200 with valid', (done) => {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=10L')
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: "L",
          returnNum: 2.64172,
          returnUnit: "gal",
          string: "10 litres converts to 2.64172 gallons"
        });
        done();
      })
  });

  test('/api/convert?input=32g - GET - 200 with invalid unit', (done) => {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end((req, res) => {
        assert.strictEqual(res.text, 'invalid unit');
        done();
      })
  });

  test('/api/convert?input=3/7.2/4kg - GET - 200 with invalid number', (done) => {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kg')
      .end((req, res) => {
        assert.strictEqual(res.text, 'invalid number');
        done();
      })
  });

  test('/api/convert?input=3/7.2/4kilomegagram - GET - 200 with invalid number and unit', (done) => {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((req, res) => {
        assert.strictEqual(res.text, 'invalid number and unit');
        done();
      })
  });

  test('/api/convert?input=kg - 200 with default value 1 for number', (done) => {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=kg')
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "kg",
          returnNum: 2.20462,
          returnUnit: "lbs",
          string: "1 kilograms converts to 2.20462 pounds"
        });
        done();
      })
  })
})
