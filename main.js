// CHANGING THEMES

// get all the elements that needs to change theme class
const bodyElement = document.querySelector("body");
const resultElement = document.querySelector(".result");
const calcPadElement = document.querySelector(".calc-pad");
const themebtnElement = document.querySelector(".theme-btn");
const btnElement = document.querySelectorAll(".reg-btn");
const resetElement = document.querySelector(".reset");
const delElement = document.querySelector(".del");
const equalElement = document.querySelector(".equal");



// get toggle buttons

const themeBtn1 = document.querySelector(".btn1");
const themeBtn2 = document.querySelector(".btn2");
const themeBtn3 = document.querySelector(".btn3");

// add a class declared after default mode to apply that styling

themeBtn1.addEventListener("click", () => {
  // change color design of the elements
  bodyElement.className = ""
  resultElement.className = "result"
  calcPadElement.className = "calc-pad"
  themebtnElement.className = "theme-btn"
  btnElement.forEach(btn => {
    btn.className = "reg-btn";
  })
  resetElement.className = "reset"
  delElement.className = "del"
  equalElement.className = "equal"

  // show selected, hide unselected buttons
  themeBtn1.className = "btn1"
  themeBtn2.className = "btn2 hidden"
  themeBtn3.className = "btn3 hidden"
})

themeBtn2.addEventListener("click", () => {
  bodyElement.className = " body2"
  resultElement.className = "result result2"
  calcPadElement.className = "calc-pad calc-pad2"
  themebtnElement.className = "theme-btn theme-btn2"
  btnElement.forEach(btn => {
    btn.className = "reg-btn reg-btn2";
  })
  resetElement.className = "reset reset2"
  delElement.className = "del del2"
  equalElement.className = "equal equal2"

  // show selected, hide unselected buttons
  themeBtn1.className = "btn1 hidden"
  themeBtn2.className = "btn2"
  themeBtn3.className = "btn3 hidden"
})

themeBtn3.addEventListener("click", () => {
  bodyElement.className = " body3";
  resultElement.className = "result result3";
  calcPadElement.className = "calc-pad calc-pad3";
  themebtnElement.className = "theme-btn theme-btn3";
  btnElement.forEach(btn => {
    btn.className = "reg-btn reg-btn3";
  })
  resetElement.className = "reset reset3";
  delElement.className = "del del3";
  equalElement.className = "equal equal3";

  // show selected, hide unselected buttons
  themeBtn1.className = "btn1 hidden";
  themeBtn2.className = "btn2 hidden";
  themeBtn3.className = "btn3 ";
})




// CALCULATOR IMPLEMENTATION


// get the buttons element 

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const delButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset]");
const equalButton = document.querySelector("[data-equal]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


class Calculator {

  constructor(previousOperandTextElement,currentOperandTextElement) {

    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.resetCalc();
    this.updateDisplay();
  }

  deleteNumber(){
    //slice off last digit in current operand
    this.currentOperand = this.currentOperand.slice(0,-1);
  }

  resetCalc() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
  }

  chooseOperator (operator) {
    if (this.previousOperand !== "" &&
    this.currentOperand === "") {
      this.operator = operator;
      return
    }

    else if (this.currentOperand === "" && 
    this.previousOperand === "") return

    else if (this.previousOperand !== "" &&
    this.currentOperand !== "") {
      // console.log("this.previousOperand:",this.previousOperand );
      // console.log("choosen operator:",this.operator )
      this.compute();
      this.operator = operator;
      // console.log("new operator:",this.operator )
      return
    }
    
    this.operator = operator;
    // console.log("choosen operator:",this.operator );
    this.previousOperand = this.currentOperand;
    // console.log("this.previousOperand:",this.previousOperand );
    this.currentOperand = "";

  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    // console.log("prev:",prev );
    // console.log("curr",curr );
    // console.log("this.operator:",this.operator);

    if (isNaN(prev) || isNaN(curr) || this.operator === undefined) return

    if (this.operator === "+") {
      computation = prev + curr;
    } else if (this.operator === "-") {
      computation = prev - curr;
    } else if (this.operator === "X") {
      computation = prev * curr;
    } else if (this.operator === "/") {
      computation = prev / curr;
    } else return

    // console.log("computation:",computation);

    this.previousOperand = Math.round(computation * 1000000) / 1000000; //fixed 6 decimal places only when necessary
    this.currentOperand = "";
    this.operator = undefined;
    // console.log("resetting this.operator:",this.operator);

  } 
  appendNumber(number) {
    // input operand should not be longer than 10 character
    if (this.currentOperand.length > 10) return
    
    // when input new operand, delete answer if its still in previousOperand saved and operator not defined
    if (this.previousOperand !== "" && this.operator === undefined){
      this.previousOperand = "";
    }
    if (number==="." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
    // console.log("this.currentOperand: ", this.currentOperand)
  }
  getDisplayNumber(number) {
    let stringNumber = number.toString();
    let intergerPart = parseFloat(stringNumber.split(".")[0]); //Get 1st part before .
    let decimalPart = stringNumber.split(".")[1];
    let displayNumber;
    if (isNaN(intergerPart)) return ''
    else {displayNumber = intergerPart.toLocaleString("en",{maximumFractionDigits:0})}
    
    if (decimalPart != null) {
      displayNumber = displayNumber +"."+ decimalPart;
    } 
    return displayNumber.toLocaleString("en",{maximumFractionDigits:0})
    
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) || this.currentOperand;
    this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) || this.previousOperand; 
    if (this.operator !== undefined) {
      this.previousOperandTextElement.innerText = 
      (this.getDisplayNumber(this.previousOperand)|| this.previousOperand) + " " + this.operator;
    }
  }
}


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);



numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  })
})

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
})

resetButton.addEventListener("click", () => {
  calculator.resetCalc();
  calculator.updateDisplay();
})

delButton.addEventListener("click", () => {
  calculator.deleteNumber();
  calculator.updateDisplay();
})