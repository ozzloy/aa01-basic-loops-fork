const chai = require("chai");
chai.use(require("chai-spies"));
const expect = chai.expect;
const eCounter = require("../problems/02-while-loop-translation");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

describe("eCounter", function () {
  it('eCounter("apple") evaluates to 1', function () {
    expect(eCounter("apple")).to.eq(1);
  });
  it('eCounter("appleapple") evaluates to 2', function () {
    expect(eCounter("appleapple")).to.eq(2);
  });
  it('eCounter("AppleEe") evaluates to 3', function () {
    expect(eCounter("AppleEe")).to.eq(3);
  });
  it('should use a for loop instead of a while loop', function () {
    const eCounterString = eCounter.toString();
    const eCounterAST = parser.parse(eCounterString);

    let hasWhileLoop = false;
    let hasForLoop = false;

    traverse(eCounterAST, {
      While() { hasWhileLoop = true; },
      For() { hasForLoop = true; }
    });

    expect(hasWhileLoop,
           "eCounter must use a while loop").to.be.true;
    expect(hasForLoop,
           "eCounter should not use a for loop").to.be.false;
  });
});
