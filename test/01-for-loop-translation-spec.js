const chai = require("chai");
chai.use(require("chai-spies"));
const expect = chai.expect;
const aCounter = require("../problems/01-for-loop-translation");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

describe("aCounter", function() {
  it('aCounter("apple") evaluates to 1', function () {
    expect(aCounter("apple")).to.eq(1);
  });
  it('aCounter("appleapple") evaluates to 2', function () {
    expect(aCounter("appleapple")).to.eq(2);
  });
  it('aCounter("aAapple") evaluates to 3', function () {
    expect(aCounter("aAapple")).to.eq(3);
  });
  it('should use a for loop instead of a while loop', function () {
    const aCounterString = aCounter.toString();
    const aCounterAST = parser.parse(aCounterString);

    let hasWhileLoop = false;
    let hasForLoop = false;

    traverse(aCounterAST, {
      While() { hasWhileLoop = true; },
      For() { hasForLoop = true; }
    });

    expect(hasForLoop,
           "aCounter must use a for loop").to.be.true;
    expect(hasWhileLoop,
           "aCounter should not use a while loop").to.be.false;
  });
});
