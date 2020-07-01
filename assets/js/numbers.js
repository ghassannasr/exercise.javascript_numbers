function compute(expression) {
  let exp = new Expression(expression);
  
  exp.doHighPrecedenceOperations();
  exp.doLowPrecedenceOperations();

  return parseFloat(exp.expArr[0]);
}


class Expression {
  constructor(expString) {
    this.expArr = this.parseStringExpressionToArray(expString);
  }

  parseStringExpressionToArray(expString) {
    
    //will create two arrays, one of all the operands
    //and another of all the operators, then merge them
    
    //create a copy of string expression first
    let temp = expString;

    //replace all clusters of digits with underscores
    expString = expString.replace(/[0-9]+/g, "_");

    //create an array of the operators only by splitting on the underscore
    //and filtering out the empty values in the resulting array
    let operators = expString.split("_").filter(function(str){return str != ""});

    //create an array of all the strings of numbers that were parsed out
    let operands = temp.split(/[^0-9\.]+/);

    //now ready to merge the operands and operators in a new array "result"
    let result = [];

    for(let i = 0; i < operands.length; i++){
      //for every operand, push and operator, except when the
      //last operand is reached
      result.push(operands[i]);
      if (i < operators.length) result.push(operators[i]);
    }
    
    return result;
  }

  doHighPrecedenceOperations() {
    let currIndex = 0;
    while(currIndex < this.expArr.length-1) {
      let currValue = this.expArr[currIndex];
      if(currValue == "*" || currValue == "/") {
        let result;
        let operand1 = parseFloat(this.expArr[currIndex-1], 10);
        let operand2 = parseFloat(this.expArr[currIndex+1], 10);
        if(currValue == "*")
          result = operand1 * operand2;
        else
          result = operand1 / operand2;

        //insert the result at the first operand's position and remove three elements
        result = result.toString();
        this.expArr.splice(currIndex-1, 3, result);
      }
      else
        currIndex++;
    }
  }

  doLowPrecedenceOperations() {
    let currIndex = 0;
    while(currIndex < this.expArr.length-1) {
      let currValue = this.expArr[currIndex];
      if(currValue == "+" || currValue == "-") {
        let result;
        let operand1 = parseFloat(this.expArr[currIndex-1], 10);
        let operand2 = parseFloat(this.expArr[currIndex+1], 10);
        if(currValue == "-")
          result = operand1 - operand2;
        else
          result = operand1 + operand2;

        //insert the result at the first operand's position and remove three elements
        result = result.toString();
        this.expArr.splice(currIndex-1, 3, result);
      }
      else
        currIndex++;
    }
  }
}
