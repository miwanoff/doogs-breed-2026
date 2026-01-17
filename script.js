const tan = document.getElementById("tan");
const pink = document.getElementById("pink");
const showCoords = document.getElementById("showCoords");
const state = document.getElementById("state");

const irises = document.getElementsByClassName("iris");

for (let i = 0; i < irises.length; i++) {
  irises[i].addEventListener("mousedown", go);
}

let irisesState = [];
for (let i = 0; i < irises.length; i++) {
  // створення масиву для відстеження irises
  irisesState[irises[i].id] = false;
}
console.log(irisesState);

function go(event) {
  console.log(event.target.id);
  const flower = document.getElementById(event.target.id);
  const breed = flower.dataset.breed;
  console.log(breed);
  const coords = getCoords(flower);
  const shiftX = event.pageX - coords.left;
  const shiftY = event.pageY - coords.top;
  console.log(shiftX, shiftY);

  function moveAt(event) {
    // сдвиг курсора на shiftX и shiftY относительно верхнего левог7о угла
    const left = event.pageX - shiftX;
    const top = event.pageY - shiftY;
    flower.style.left = left + "px";
    flower.style.top = top + "px";
    showCoords.innerHTML = `x: ${left} y ${top}`;
    if (onField(tan, left, top)) {
      if (breed == "tan") {
        tan.style.border = "solid green 2px";
        pink.style.border = "none";
      } else {
        tan.style.border = "solid red 2px";
        pink.style.border = "none";
      }
    }
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        pink.style.border = "solid green 2px";
        tan.style.border = "none";
      } else {
        pink.style.border = "solid red 2px";
        tan.style.border = "none";
      }
    }
  }

  flower.ondragstart = function () {
    return false; // отмена drag and drop браузера
  };

  document.onmousemove = function (e) {
    moveAt(e);
  };

  flower.onmouseup = function () {
    document.onmousemove = null;
    flower.onmouseup = null;
    res(event);
  };

  function res(event) {
    tan.style.border = "none";
    pink.style.border = "none";
    // отримуємо координати квітки
    const left = parseInt(flower.style.left);
    const top = parseInt(flower.style.top);
    if (onField(tan, left, top)) {
      state.innerHTML =
        flower.id + " сорт " + breed + " відпускаємо на поле tan!"; // записуємо у поле state
      if (breed == "tan") {
        irisesState[flower.id] = true;
      } else {
        irisesState[flower.id] = false;
      }
    //   console.log(irisesState);
    }
    if (onField(pink, left, top)) {
      state.innerHTML =
        flower.id + " сорт " + breed + " відпускаємо на поле pink!";
      if (breed == "pink") {
        irisesState[flower.id] = true;
      } else {
        irisesState[flower.id] = false;
      }
    //   console.log(irisesState);
    }
    console.log(irisesState);
  }
}

function getCoords(elem) {
  //getBoundingClientRect()  функция возвращает размер элемента и его координаты относительно объемлющего элемента.
  var box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left,
    width: box.width,
    height: box.height,
  };
}

function onField(f, left, top) {
  let field = getCoords(f);
  if (
    left > field.left &&
    left < field.left + field.width &&
    top > field.top &&
    top < field.top + field.height
  ) {
    return true;
  } else {
    return false;
  }
}

function check() {

}
