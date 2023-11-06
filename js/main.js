"use strict"

/* Toggles the visibility of one or a collection of elements */
function visibilitySwitch(elements) {
  if (Number.isInteger(elements.length)) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hidden");
    }
  } else {
    elements.classList.toggle("hidden");
  }
}

/* Hides an element in one of the ways: display:none, visibility: hidden, elem.remove */
function hideElement(elem, way) {
  switch (way) {
    case "none": elem.style.display = "none"; break;
    case "removeChild": elem.remove(); break;
    case "class": elem.setAttribute("class", "hidden");
  }
}

/* Shows a hidden element or creates one if it doesn't exist */
function showElement(elem, parentElem) {
  elem.removeAttribute("class", "hidden");
  elem.style.display = "block";
  parentElem.appendChild(elem);
}

/* Сreates an HTML element with parameters:
parentSelector - selector of the parent element
tag - tag of the element being created
inscription - content in the middle of the element
width - element width
height - element height
background - background of this element
attribute - array containing an element attribute and its value
 */
function createAndAddElement(parentSelector, tag, inscription, width, height, background, attribute) {
  let parent = document.querySelectorAll(parentSelector)[0];
  let elem = document.createElement(tag);
  let property = (tag == "input") ? "placeholder" : "innerHTML";
  elem[property] = inscription;
  elem.style.width = width + "px";
  elem.style.height = height + "px";
  elem.style.margin = 5 + "px";
  elem.style.background = background;

  if (attribute != undefined) {
    let nameAttribute = attribute[0];
    let valueAttribute = attribute[1];
    elem.setAttribute(nameAttribute, valueAttribute);
  }

  parent.appendChild(elem);
  return elem;
}

/* Set attributes and properties of the element */
function setCss(elem, propertys) {
  let attributes = ["src", "value", "type", "contentEditable"];

  Object.keys(propertys).forEach(key => {
    if (attributes.includes(key)) {
      elem[key] = propertys[key];
    } else {
      elem.style[key] = propertys[key];
    }
  });
}

/********************************* task1 **********************************/
function runTask1() {
  let buttons = [];
  let nameButtons = ["display none", "delete", "hidden", "to show"];

  for (let i = 0; i < nameButtons.length; i++) {
    buttons[i] = createAndAddElement(".task1", "button", nameButtons[i]);
  }

  let square = createAndAddElement(".task1", "div", "", 100, 100, "#000");
  let parentElem = square.parentElement;
  let ways = ["none", "removeChild", "class"];

  for (let i = 0; i < buttons.length; i++) {
    let callbackFun = (i == buttons.length - 1) ? () => showElement(square, parentElem) : () => hideElement(square, ways[i]);
    buttons[i].addEventListener("click", callbackFun);
  }
}
runTask1();

/********************************* task2 **********************************/
function runTask2() {
  createAndAddElement(".task2", "h3", "Task block 2");
  let block = document.getElementsByClassName("task2")[0];
  let button = document.getElementById("button-task2");

  button.addEventListener("click", () => visibilitySwitch(block));
}
runTask2();

/********************************* task3 **********************************/
function runTask3() {
  let numberOfSquares = 5;
  let claasname = "square";
  let button = createAndAddElement(".task3", "button", "show or hide elements");

  for (let i = 0; i < numberOfSquares; i++) {
    createAndAddElement(".task3", "div", "", 100, 100, "#000", ["class", claasname]);
  }
  let squares = document.getElementsByClassName(claasname);
  button.addEventListener("click", () => visibilitySwitch(squares));
}
runTask3();

/********************************* task4 **********************************/
function runTask4() {
  let input = createAndAddElement(".task4", "input", "enter the selector");
  let button = createAndAddElement(".task4", "button", "show or hide by selector");

  button.addEventListener("click", () => {
    let selector = input.value;
    let elementsBySelector = document.querySelectorAll(selector);
    visibilitySwitch(elementsBySelector);
  });
}
runTask4();

/********************************* task5 **********************************/
function runTask5() {
  let yellowSquare = createAndAddElement(".task5", "div", "", 100, 100, "yellow");
  let count = 0;

  yellowSquare.addEventListener("click", () => {
    let fun = (count == 0) ? () => alert("Привіт") : () => hideElement(yellowSquare, "none");
    fun();
    count++;
  });
}
runTask5();

/********************************* task6 **********************************/
function runTask6() {
  let button = createAndAddElement(".task6", "button", "button hover");
  let square = createAndAddElement(".task6", "div", "", 50, 50, "red");
  hideElement(square, "none");

  button.addEventListener("mouseover", () => showElement(square));
  button.addEventListener("mouseout", () => hideElement(square, "none"));
}
runTask6();

/********************************* task7 **********************************/
let input = createAndAddElement(".task7", "input", "enter text");
let rect = createAndAddElement(".task7", "div", "", 50, 20, "green");
hideElement(rect, "none")

input.addEventListener("focus", () => showElement(rect));
input.addEventListener("input", () => hideElement(rect, "none"));

/********************************* task8 **********************************/
function runTask8() {
  let block = document.getElementsByClassName("task8")[0];
  let button = createAndAddElement(".task8", "button", "go over");
  let input = createAndAddElement(".task8", "input", "enter path");
  let heightImage = "80%";

  button.addEventListener("click", () => {
    let img = document.createElement("img");
    setCss(img, { "src": input.value, "height": heightImage });
    block.appendChild(img);
  });
}
runTask8();

/********************************* task9 **********************************/
function runTask9() {
  let textarea = createAndAddElement(".task9", "textarea", "", 500, 100,);
  let button = createAndAddElement(".task9", "button", "show pictures");
  let block = document.getElementsByClassName("task9")[0];

  button.addEventListener("click", () => {
    let value = textarea.value;
    let lines = value.split("\n");

    for (let i = 0; i < lines.length; i++) {
      let path = lines[i];
      let img = document.createElement("img");
      setCss(img, { "src": path, "height": "100px" });

      block.appendChild(img);
    }
  });
}
runTask9();

/********************************* task10 task11 task12 **********************************/
function runTask10() {
  let lang = document.documentElement.lang;
  let block = createAndAddElement("body", "div", "", "", "", "", ["class", "pageInfo"]);
  setCss(block, {
    display: "none",
    background: "red",
    minWidth: "60px",
    position: "fixed",
    right: 0,
    top: 0,
    padding: "5px",
  });

  let coordinates = createAndAddElement(".pageInfo", "div", "", "100%");
  setCss(coordinates, {
    margin: 0,
  });

  let coords = navigator.geolocation.getCurrentPosition((pos) => {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;

    block.innerHTML = "Ш: " + latitude + ", " +
      "Д: " + longitude +
      "<br>lang: " + document.documentElement.lang;
    block.appendChild(coordinates);
    block.style.display = "block";
  });

  document.addEventListener("mousemove", (e) => {
    coordinates.innerHTML = "X: " + e.pageX + "<br>" + "Y: " + e.pageY;
  });
}
runTask10();

/********************************* task13 **********************************/
function runTask13() {
  /* uncomment to clear memory */
  //localStorage.removeItem("saveText");
  //sessionStorage.removeItem("saveText");

  let startText = "start text in block";
  /* the time in seconds that the data is stored in the cookie */
  let timerCookiis = 15;

  /* an object with the functions of storing the entered text */
  let functionsClickBlocks = {
    saveByLocalStorage: (e) => {
      let text = e.target.innerHTML;
      window.localStorage.setItem("saveText", text);
    },
    saveByCookies: (e) => {
      let text = e.target.innerHTML;
      document.cookie = text + "; max-age=" + timerCookiis;
    },
    saveBySessionStorage: (e) => {
      let text = e.target.innerHTML;
      window.sessionStorage.setItem("saveText", text);
    }
  }

  /* an object with the functions of reading stored text */
  let storage = {
    textLocalStorage: () => { return window.localStorage.getItem("saveText") },
    textCocie: () => { return (document.cookie.length == 0) ? startText : document.cookie },
    textSesionStorage: () => { return window.sessionStorage.getItem("saveText") }
  };

  /* filling blocks with text */
  window.addEventListener("load", () => {
    let i = 0;
    for (let key in storage) {
      let textStorage = storage[key]();
      textStorage ??= startText;
      blocks[i++].innerHTML = textStorage;
    }
  });

  let blocks = [];
  let numberBlocks = 3;

  let functions = Object.values(functionsClickBlocks);
  for (let i = 0; i < numberBlocks; i++) {
    let block = createAndAddElement(".task13", "div", startText);
    blocks.push(block);
    setCss(block, {
      border: "1px solid #000",
      minHeight: "50px",
      contentEditable: true,
    });

    block.addEventListener("input", (e) => functions[i](e));
  }
}
runTask13();

/********************************* task14 **********************************/
function runTask14() {
  let disappearingButton = createAndAddElement("body", "button", "up", 50, 50, "#234");
  setCss(disappearingButton, {
    position: "fixed",
    right: 0,
    bottom: 0,
    opacity: 0.8,
    display: "none",
  });

  document.addEventListener("scroll", (e) => {
    let maxHeight = document.documentElement.scrollHeight;
    let currentScroll = window.scrollY;
    let visibleArea = document.documentElement.clientHeight;
    hideElement(disappearingButton, "none");

    if (visibleArea + currentScroll >= maxHeight) {
      showElement(disappearingButton, "none");
    }
  });

  disappearingButton.addEventListener("click", () => {
    let distancePerFrame = -300;
    let timeToNextFrame = 40;
    let movement = setInterval(() => { window.scrollY == 0 ? clearTimeout(movement) : window.scrollBy(0, distancePerFrame) }, timeToNextFrame);
  });
}
runTask14();

/********************************* task15 **********************************/
function runTask15() {
  let classbigBlock = "bigBlock";
  let bigBlock = createAndAddElement(".task15", "div", "", 150, 150, "#000", ["class", classbigBlock]);
  let smallBlock = createAndAddElement(".bigBlock", "div", "", 75, 75, "red");
  setCss(bigBlock, {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
  });

  bigBlock.addEventListener("click", (e) => {
    let elem = e.target;
    let size = (elem.classList.contains(classbigBlock)) ? "big" : "small";
    alert(`This is ${size} block`);
  });
}
runTask15();

/********************************* task16 **********************************/
function runTask16() {
  let button = createAndAddElement(".task16", "button", "show square");
  let square = createAndAddElement("body", "div", "", 0, 0, "grey");
  setCss(square, {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    opacity: "0.5",
    display: "none",
  });

  button.addEventListener("click", (e) => {
    document.documentElement.style.overflow = "hidden";
    showElement(square);
  });

  square.addEventListener("click", () => {
    document.documentElement.style.overflow = "auto";
    hideElement(square, "none");
  });
}
runTask16();

/********************************* task17 **********************************/
function runTask17() {
  let form = createAndAddElement(".task17", "form", "", "auto", "auto", "", ["id", "form"]);
  let input = createAndAddElement("#form", "input");
  setCss(input, {
    type: "submit",
    value: "GO",
  });

  input.addEventListener("click", (e) => {
    e.preventDefault();
  });
}
runTask17();

/********************************* task18 **********************************/
function runTask18() {
  let block = createAndAddElement(".task18", "div", "", 250, 60, "#333", ["class", "block"]);
  setCss(block, {
    position: "relative",
    border: "1px solid green",
  });

  let text = createAndAddElement(".block", "div", "Add file");
  setCss(text, {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  let input = createAndAddElement(".block", "input");
  setCss(input, {
    type: "file",
    display: "block",
    margin: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    zIndex: 5,
    opacity: 0,
  });

  document.addEventListener("dragenter", documentDrag);
  function documentDrag(e) {
    setCss(block, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animationName: "animation-Block",
      animationDuration: "0.9s",
      animationIterationCount: "infinite",
    });
    input.style.opacity = 0;
    text.innerHTML = "Put the file here!";
  }

  input.addEventListener("change", () => {
    block.style.animationName = "none";
    let fileName = getFileName(input.value);
    text.innerHTML = `${fileName} is selected &#9745`;
  });

  function getFileName(value) {
    return value.slice(value.lastIndexOf("\\") + 1);
  }
}
runTask18();
