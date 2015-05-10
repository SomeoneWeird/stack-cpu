
var assert = require('assert');

var CPU = require('../vm');

describe("CPU", function() {

  it("should work", function() {

    var program = [
      "PSH", "5",
      "PSH", "2",
      "ADD"
    ];

    var cpu = new CPU(program);

    assert.throws(function() {
      cpu.run();
    });

    assert.equal(program.length, cpu.IP);
    assert.equal(cpu.stack[0], 7);

  });


});