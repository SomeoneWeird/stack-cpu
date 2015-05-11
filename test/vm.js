
var assert = require('assert');

var CPU = require('../vm');

describe("CPU", function() {

  describe("instructions", function() {

    describe("PSH", function() {

      it("should push value to stack", function() {

        var cpu = new CPU([ "PSH", "5", "HLT" ]);

        cpu.run();

        assert.equal(cpu.stack[0], 5);

      });

    });

    describe("ADD", function() {

      it("should add previous 2 values from stack", function() {

        var cpu = new CPU([
          "PSH", "5",
          "PSH", "10",
          "ADD",
          "HLT"
        ]);

        cpu.run();

        assert.equal(cpu.stack[0], 15);

      });

    });

    describe("POP", function() {

      it("should pop value from stack", function() {

        var cpu = new CPU([
          "PSH", "5",
          "POP",
          "HLT"
        ]);

        cpu.run();

        assert.equal(cpu.stack.length, 0);

      });

    });

  });

});