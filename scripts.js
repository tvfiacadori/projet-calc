const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

// console.log(buttons) work good

class Calculator {
  //serve para manipular elementos html pelo js tornando eles objetos
  
    constructor(previousOperationText, currentOperationText) {
  
    // esse sao os valores que vao ser impresso na tela
    
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    
    // esse é o valor que estou digitando agora
    
    this.currentOperation = ""
  }

  // add digito da calculadora na tela
  addDigit(digit) {

    // Confirma se operação ja possui um pont

    if(digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }


    this.currentOperation = digit
    this.updateScreen()
  }
  // Funcionamento da calculadora

  processOperation(operation) {

    // check se o valor esta vazio

    if(this.currentOperationText.innerText === "" && operation !== "C") {

       // troca de operacao 

        if(this.previousOperationText.innerText !== "") {
           this.changeOperation(operation);
        }
        return;
    }
   
   // Para ver o valor current

   let operationValue;
   const previous = +this.previousOperationText.innerText.split(" ")[0];
   const current = +this.currentOperationText.innerText;

   switch (operation) {
    case "+":
      operationValue = previous + current
      this.updateScreen(operationValue, operation, current, previous);
      break;

      case "-":
      operationValue = previous - current
      this.updateScreen(operationValue, operation, current, previous);

      break;
      case "/":
      operationValue = previous / current
      this.updateScreen(operationValue, operation, current, previous);

      break;
      case "*":
      operationValue = previous * current
      this.updateScreen(operationValue, operation, current, previous);

      break;
      case "DEL":
      this.processDelOperator() 

      break;
      case "CE":
      this.processClearOperation()
      
      break;
      case "C":
      this.processClearAll()

      break;
      case "=":
      this.processEqual()

      default:
      return;

   }

  }

  // troca de valor da calculadora

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null

  ){

    if(operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {

      // Check se o valor for zero add o current valor
      if(previous === 0) {
        operationValue = current
      }

      // add o valor current de previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = "";
    }
  }

  // troca de operação

  changeOperation(operation) {

    const mathOperation = ["*", "/", "+", "-"]

    if(!mathOperation.includes(operation)){
        return;
   } 


    this.previousOperationText.innerText = 
    this.previousOperationText.innerText.slice(0, -1) + operation;

  }

  // função de deletar 1 digito
    processDelOperator() {

      this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // CE função para apagar operação atual
    processClearOperation() {
      this.currentOperationText.innerText = "";
    }

    // operacao para limpar tudo
    processClearAll() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";

    }

    // igual 

    processEqual() {
      
      const operation = previousOperationText.innerText.split(" ")[1]
      
      this.processOperation(operation);
      
    }
  
}

const calc = new Calculator(previousOperationText, currentOperationText); 

//Isso serve para afichar o click no button
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) =>{
    
    const value = e.target.innerText;

    //isso eu ultizei para separar valores de operadores

    if (+value >= 0 || value === "." ){

      calc.addDigit(value);
      
    } else {
      calc.processOperation(value);
    }
    
  });
});
