const tan = document.getElementById("tan");
const pink = document.getElementById("pink");
const showCoords = document.getElementById("showCoords");
const state = document.getElementById("state");

const irises = document.getElementsByClassName("iris");

for (let i = 0; i < irises.length; i++) {
  irises[i].addEventListener("mousedown", go);
}

function go(event) {
  console.log(event.target.id);
  const flower = document.getElementById(event.target.id);
}
