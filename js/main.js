"use strict"
/*############################ task1 ##########################################*/
let buttons = document.getElementsByClassName("task1")[0].getElementsByTagName("button");
let square = document.getElementById("square");
let parentElem = square.parentElement;
let ways = ["none", "removeChild", "class"];

for (let i = 0; i < buttons.length; i++) {
  let callbackFun = (i == buttons.length - 1) ? () => showElement(parentElem, square) : () => hideElement(square, ways[i]);
  buttons[i].addEventListener("click", callbackFun);
}

function hideElement(elem, way) {
  switch (way) {
    case "none": elem.style.display = "none"; break;
    case "removeChild": {
      elem.parentElement.removeChild(square);
      break;
    }
    case "class": elem.setAttribute("class", "hidden");
  }
}

function showElement(parentElem, elem) {
  elem.removeAttribute("class", "hidden");
  elem.style.display = "block";
  parentElem.appendChild(elem);
}

/*############################ task2 ##########################################*/
let block = document.getElementsByClassName("task2")[0];
let button = document.getElementById("button-task2");

button.addEventListener("click", () => block.classList.toggle("hidden"));

/*############################ task3 ##########################################*/
let block3 = document.getElementsByClassName("task3")[0];
let squares = block3.getElementsByClassName("square");
let buttonTask3 = document.getElementById("button-task3");

buttonTask3.addEventListener("click", () => visibilitySwitch(squares));

/* скриває один або колекцію елементів*/
function visibilitySwitch(elements) {
  if (Number.isInteger(elements.length)) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hidden");
    }
  } else {
    elements.classList.toggle("hidden");
  }
}

/*############################ task4 ##########################################*/
let selector;
let elementsBySelector;
let input = document.getElementsByTagName("input")[0];
let buttonTask4 = document.getElementById("button-task4");

buttonTask4.addEventListener("click", () => {
  selector = input.value;
  elementsBySelector = document.querySelectorAll(selector);
  visibilitySwitch(elementsBySelector);
});

/*############################ task5 ##########################################*/
let yellowSquare = document.getElementsByClassName("task5")[0].getElementsByTagName("div")[0];
let count = 0;

yellowSquare.addEventListener("click", () => {
  let fun = (count == 0) ? () => alert("Привіт") : () => hideElement(yellowSquare, "none");
  fun();
  count++;
});

