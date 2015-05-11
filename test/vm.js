
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

    describe("SUB", function() {

      it("should subtract previous 2 values from stack", function() {

        var cpu = new CPU([
          "PSH", "5",
          "PSH", "5",
          "SUB",
          "HLT"
        ]);

        cpu.run();

        assert.equal(cpu.stack[0], 0);

      });

    });

    describe("MUL", function() {

      it("should multiply previous 2 values from stack", function() {

        var cpu = new CPU([
          "PSH", "5",
          "PSH", "25",
          "MUL",
          "HLT"
        ]);

        cpu.run();

        assert.equal(cpu.stack[0], 125);

      });

    });

    describe("DIV", function() {

      it("should divide previous 2 values from stack", function() {

        var cpu = new CPU([
          "PSH", "10",
          "PSH", "5",
          "DIV",
          "HLT"
        ]);

        cpu.run();

        assert.equal(cpu.stack[0], 2);

      });

      it("should throw if divide by zero", function() {

        var cpu = new CPU([
          "PSH", "10",
          "PSH", "0",
          "DIV",
          "HLT"
        ]);

        assert.throws(function() {
          cpu.run();
        });

      });

    });

  });

});