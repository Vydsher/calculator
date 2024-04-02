// Смена стилей
const switchEl = document.getElementById("style-check");

switchEl.addEventListener("change", () => {
  let textSwitch = document.querySelector(".calc__switch-text");

  if (switchEl.checked) {
    document.documentElement.className = "dark-theme";
    textSwitch.textContent = "Switch to Light";
  } else {
    document.documentElement.className = "light-theme";
    textSwitch.textContent = "Switch to Dark";
  }
});

// Реализация калькулятора
// Присвоение ссылок с тегов, которые отвечают за вывод на дисплей
const mathExpl = document.querySelector(".calc__math-example");
const inptNumber = document.querySelector(".calc__input-number");

let operationPressed;
let answer;
let operationCounter = 0;
let clearInptNumber;
let readyAnswer;

// Функция проводящая операции с числами
let makeOperations = () => {
  switch (operationPressed) {
    case "/":
      answer /= parseFloat(inptNumber.textContent);
      break;
    case "x":
      answer *= parseFloat(inptNumber.textContent);
      break;
    case "-":
      answer -= parseFloat(inptNumber.textContent);
      break;
    case "+":
      answer += parseFloat(inptNumber.textContent);
      break;
  }
  operationCounter++;
  digitCnt = String(answer).match(/\d/g).length;
  if (digitCnt > 9) {
    answer = answer.toExponential(digitCnt - (digitCnt - 4));
  }
};

// Присвоение обработчика событий кнопкам с цифрами
const dgtsBtns = document.querySelectorAll(
  ".calc__digit-buttons, .calc__2-column-content"
);

dgtsBtns.forEach((dgtBtn) => {
  dgtBtn.addEventListener("click", () => {
    clrBtn.textContent = "C";

    if (clearInptNumber) {
      inptNumber.textContent = 0;
      clearInptNumber = false;
      readyAnswer = true;
    }

    if (inptNumber.textContent == "0") {
      inptNumber.textContent = dgtBtn.textContent;
      return;
    }

    if (inptNumber.textContent.length < 9) {
      inptNumber.textContent += dgtBtn.textContent;
    }
  });
});

// Присвоение обработчика событий кнопкам с /x-+
const operationBtns = document.querySelectorAll(".calc__operation-buttons");

operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", () => {
    if (!answer) {
      answer = parseFloat(inptNumber.textContent);
    }

    if (!clearInptNumber) {
      clearInptNumber = true;
    }

    if (readyAnswer) {
      makeOperations();
      inptNumber.textContent = answer;
      readyAnswer = false;
    }

    operationPressed = operationBtn.textContent;
  });
});

// Присвоение обработчика событий кнопке =
const equallyBtn = document.querySelector(".calc__equally-button");

equallyBtn.addEventListener("click", () => {
  makeOperations();
  inptNumber.textContent = answer;
  readyAnswer = false;
  clearInptNumber = false;
});

// Добавление очистки дисплея на нажатие кнопки
const clrBtn = document.getElementById("clearBtn");

clrBtn.addEventListener("click", () => {
  if (inptNumber.textContent != 0) {
    inptNumber.textContent = 0;
    clrBtn.textContent = "AC";
  } else {
    mathExpl.textContent = "";
    inptNumber.textContent = 0;
    answer = 0;
    readyAnswer = false;
    clearInptNumber = false;
  }
});

//Добавление изменения числа на отрицательное и обратно в полож
const posNegBtn = document.getElementById("positiveNegativeButton");
posNegBtn.addEventListener("click", () => {
  if (parseFloat(inptNumber.textContent) < 0) {
    inptNumber.textContent = inptNumber.textContent.substring(1);
    negCheck = false;
    return;
  }

  if (parseFloat(inptNumber.textContent) > 0) {
    inptNumber.textContent = "-" + inptNumber.textContent;
  }
});

// Добавление десятичного раздрелителя
const sepBtn = document.getElementById("separatorNumberBtn");
sepBtn.addEventListener("click", () => {
  if (
    parseFloat(inptNumber.textContent) % 1 == 0 &&
    inptNumber.textContent.length < 9 &&
    inptNumber.textContent.indexOf(".") == -1
  ) {
    inptNumber.textContent += ".";
  } else if (
    inptNumber.textContent.indexOf(".") ==
    inptNumber.textContent.length - 1
  ) {
    sepCheck = false;
    inptNumber.textContent = inptNumber.textContent.substring(
      0,
      inptNumber.textContent.length - 1
    );
  }
});

const percentBy = document.getElementById("percentByNumberButton");
percentBy.addEventListener("click", () => {
  if (inptNumber.textContent != 0) {
    inptNumber.textContent = parseFloat(inptNumber.textContent) / 100;
  }
});
