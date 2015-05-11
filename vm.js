
function CPU(program) {

  this.instructions = {
    PSH: {
      parity: 1,
      fn: function(args) {
        this.pushStack(args[0]);
      }
    },
    ADD: {
      fn: function() {
        var one = this.popStack();
        var two = this.popStack();
        this.pushStack(one + two);
      }
    },
    SUB: {
      fn: function() {
        var one = this.popStack();
        var two = this.popStack();
        this.pushStack(one - two);
      }
    },
    MUL: {
      fn: function() {
        var one = this.popStack();
        var two = this.popStack();
        this.pushStack(one * two);
      }
    },
    DIV: {
      fn: function() {
        var one = this.popStack();
        var two = this.popStack();
        if(one === 0) {
          throw new Error("Tried to divide by zero.");
        }
        this.pushStack(two / one);
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

CPU.prototype.popStack = function() {
  var item = this.stack.pop();
  this.SP--;
  return item;
}

CPU.prototype.step = function(num) {

  if(!num) num = 1;

  for(var i = 0; i < num; i++) {

    var instruction = this.program[this.IP];
    var parity      = this.instructions[instruction].parity || 0;
    var args        = [];

    for(var i = 0; i < parity; i++) {
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

    fn.bind(this)(args);

    this.IP = this.IP + parity + 1;

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
