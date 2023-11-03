"use strict"
// function getElements(classBlock, teg) {
//   return document.getElementsByClassName(classBlock)[0].getElementsByTagName(teg);
// }

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

function hideElement(elem, way) {
  switch (way) {
    case "none": elem.style.display = "none"; break;
    case "removeChild": elem.remove(); break;
    case "class": elem.setAttribute("class", "hidden");
  }
}

function showElement(elem, parentElem) {
  elem.removeAttribute("class", "hidden");
  elem.style.display = "block";
  parentElem.appendChild(elem);
}

function createRectangle(width, height, background) {
  let rect = document.createElement("div");
  rect.style.width = width + "px";
  rect.style.height = height + "px";
  rect.style.background = background;
  return rect;
}

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

function setCss(elem, propertys) {
  let attributes=["src","value","type"];
  

  Object.keys(propertys).forEach(key => {
    if (attributes.includes(key)) {
      elem.src = propertys[key];
    } else {
      elem.style[key] = propertys[key];
    }
  });
}


/*############################ task1 ##########################################*/
function runTask1() {
  let buttons = [];

  let nameButtons = ["display none", "delete", "hidden", "to show"];
  for (let i = 0; i < 4; i++) {
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

/*############################ task2 ##########################################*/
function runTask2() {
  createAndAddElement(".task2", "h3", "Task block 2");
  let block = document.getElementsByClassName("task2")[0];
  let button = document.getElementById("button-task2");

  button.addEventListener("click", () => visibilitySwitch(block));
}
runTask2();

/*############################ task3 ##########################################*/
function runTask3() {
  let claasname = "square";
  let button = createAndAddElement(".task3", "button", "show or hide elements");

  for (let i = 0; i < 5; i++) {
    createAndAddElement(".task3", "div", "", 100, 100, "#000", ["class", claasname]);
  }
  let squares = document.getElementsByClassName(claasname);
  button.addEventListener("click", () => visibilitySwitch(squares));
}
runTask3();

/*############################ task4 ##########################################*/
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

/*############################ task5 ##########################################*/
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

/*############################ task6 ##########################################*/
function runTask6() {
  let block = document.getElementsByClassName("task6")[0];
  let button = createAndAddElement(".task6", "button", "button hover");
  let square = createAndAddElement(".task6", "div", "", 50, 50, "red");
  hideElement(square, "none");

  button.addEventListener("mouseover", () => showElement(square));
  button.addEventListener("mouseout", () => hideElement(square, "none"));
}
runTask6();

/*############################ task7 ##########################################*/
let input = createAndAddElement(".task7", "input", "enter text");
let parent = document.getElementsByClassName("task7")[0];
let rect = createRectangle(50, 20, "green");

parent.appendChild(rect);
hideElement(rect, "none")
input.addEventListener("focus", () => showElement(rect));
input.addEventListener("input", () => hideElement(rect, "none"));

/*############################ task8 ##########################################*/
function runTask8() {
  let block = document.getElementsByClassName("task8")[0];
  let button = createAndAddElement(".task8", "button", "go over");
  let input = createAndAddElement(".task8", "input", "enter path");

  button.addEventListener("click", () => {
    let img = document.createElement("img");
    setCss(img, { "src": input.value, "height": "80%" })
    block.appendChild(img);
  });
}
runTask8();

/*############################ task9 ##########################################*/
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

/*############################ task10  task11  task12 ##########################################*/
function runTask10() {
  let lang = document.documentElement.lang;
  let block = createAndAddElement("body", "div", "", "", "", "red");
  let propertys = {
    "minWidth": "60px",
    "position": "fixed",
    "right": 0,
    "top": 0,
  };
  setCss(block, propertys);

  document.addEventListener("mousemove", (e) => {
    let coords = navigator.geolocation.getCurrentPosition((pos) => {
      let latitude = pos.coords.latitude;
      let longitude = pos.coords.longitude;

      block.innerHTML = "Ш: " + latitude + ", " +
        "Д: " + longitude + "<br>" +
        "lang = " + lang + "<br>" +
        "X: " + e.pageX + "<br>" +
        "Y: " + e.pageY;
    });
  });
}
runTask10();

/*############################ task15 ##########################################*/
function runTask15() {
  let classbigBlock = "bigBlock";
  let bigBlock = createAndAddElement(".task15", "div", "", 150, 150, "#000", ["class", classbigBlock]);
  let smallBlock = createAndAddElement(".bigBlock", "div", "", 75, 75, "red");
  let propertys = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
  }
  setCss(bigBlock, propertys);

  bigBlock.addEventListener("click", (e) => {
    let elem = e.target;
    let size = (elem.classList.contains(classbigBlock)) ? "big" : "small";
    alert(`This is ${size} block`);
  });
}
runTask15();

/*############################ task16 ##########################################*/
function runTask16() {
  let button=createAndAddElement(".task16", "button", "show square");
  let square = createAndAddElement("body", "div", "", 0, 0, "grey");
  let properties = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    opacity: "0.5",
    display: "none",
  };
  setCss(square, properties);

  button.addEventListener("click",(e)=>{
    document.documentElement.style.overflow="hidden";
    showElement(square);
  });

  square.addEventListener("click",()=>{
    document.documentElement.style.overflow="auto";
    hideElement(square,"none");
  });
}
runTask16();

/*############################ task17 ##########################################*/
function runTask17() {
  //<form><input type="submit" value="GO"></form>

  let form=createAndAddElement(".task17", "form","","auto","auto","",["id","form"]);
  // let attributes={
  //   type: "submit",
  //   value: "GO",
  // };
  // setCss(form,attributes);

  console.log(form) ;



 let input=createAndAddElement("#form", "input");



}
runTask17();


