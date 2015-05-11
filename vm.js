
function CPU(program) {

  this.instructions = {
    PSH: {
      arity: 1,
      fn: function(args) {
        this.pushStack(args[0]);
      }
    },
    ADD: {
      fn: function() {
        var values = this.popStack(2);
        this.pushStack(values[0] + values[1]);
      }
    },
    SUB: {
      fn: function() {
        var values = this.popStack(2);
        this.pushStack(values[0] - values[1]);
      }
    },
    MUL: {
      fn: function() {
        var values = this.popStack(2);
        this.pushStack(values[0] * values[1]);
      }
    },
    DIV: {
      fn: function() {
        var values = this.popStack(2);
        if(values[0] === 0) {
          throw new Error("Tried to divide by zero.");
        }
        this.pushStack(values[1] / values[0]);
      }
    },
    POP: {
      fn: function() {
        var value = this.popStack();
        console.log("Popped value:", value);
      }
    },
    HLT: {
      fn: function() {
        this.running = false;
      }
    }
  }
  
  this.program = program;
  this.running = false;
  this.stack   = [];

  this.IP = 0;
  this.SP = 0;

}

CPU.prototype.pushStack = function(item) {
  this.SP = this.stack.push(item);
}

CPU.prototype.popStack = function(num) {
  if(!num || num === 1) {
    return getValue.call(this);
  }
  function getValue() {
    var item = this.stack.pop();
    this.SP--;
    return item;
  }
  return Array.apply(null, { length: num }).map(getValue.bind(this));
}

CPU.prototype.step = function(num) {

  if(!num) num = 1;

  for(var i = 0; i < num; i++) {

    var instruction = this.program[this.IP];
    var arity       = this.instructions[instruction].arity || 0;
    var args        = [];

    for(var i = 0; i < arity; i++) {
      var arg = parseInt(this.program[this.IP + i + 1]);
      if(isNaN(arg)) {
        throw new Error("Argument " + arg + " for " + instruction + " is not a valid number.");
      }
      args.push(arg);
    }

    var fn = this.instructions[instruction].fn;

    if(!fn) {
      console.log("Unknown instruction:", instruction);
      return;
    }

    fn.call(this, args);

    this.IP += arity + 1;

  }

  return this;

}

CPU.prototype.run = function() {

  this.running = true;

  while(this.running) {

    var instruction = this.program[this.IP];

    if(!instruction) {
      // end of program.
      this.running = false;
      throw new Error("End of Program - HLT was not called.");
    }

    this.step();

  }

}

module.exports = CPU;
