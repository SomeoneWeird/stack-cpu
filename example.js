
var CPU = require('./vm');

var program = `
SET A 5
PSH 10
STR A
ADD
PSH 10
MUL
LDR result
HLT
`;

var cpu = new CPU(program.split(/[\n\s]/).filter(Boolean));

cpu.run();

console.log("(5 + 10) * 10 = " + cpu.registers.result);