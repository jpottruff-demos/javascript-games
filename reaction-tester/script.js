const control = document.getElementById('control');
const shape = document.getElementById('shape');
const reactionTime = document.getElementById('reactionTime');

let playing = false;

let startTime;
let endTime;

// window.addEventListener("load", generateShape);
control.addEventListener("click", toggleControl);
shape.addEventListener("click", displayTime)

function toggleControl() {
  if (!playing) {
    playing = true;
    generateShape();
    control.innerHTML = "Pause";
  } else {
    playing = false;
    control.innerHTML = "Click to start";
  }
}


function generateShape() {
  setTimeout(setShape, Math.random() * 2500);
}

function setShape() {
  let intColor = Math.floor(Math.random() * 3) + 1;
  let intShape = Math.floor(Math.random() * 3) + 1;
  let top = (Math.random()) * 20;
  let left = (Math.random()) * 40 - 20;

  let newShape;
  let color;
  let styles;

  switch (intShape) {
    case 1:
    newShape = "square";
    break;
    case 2:
    newShape = "circle";
    break;
    case 3:
    newShape = "triangle";
    break;
  }

  switch (intColor) {
    case 1:
      color = "red";
      break;
    case 2:
      color = "yellow";
      break;
    case 3:
      color = "blue";
      break;
  }

  if (newShape === "triangle") {

    let rotateBy = Math.floor(Math.random() * 4) + 1;
    let rotate;

    switch (rotateBy) {
      case 1:
        rotate = "rotate(0deg)";
        break;
      case 2:
        rotate = "rotate(90deg)";
        break;
      case 3:
        rotate = "rotate(180deg)";
        break;
      case 4:
        rotate = "rotate(-90deg)";
        break;
    }

    styles = "border-right:50px solid " + color + ";top:" + top + "em;left:" + left + "em; transform:" + rotate + ";";
  } else {
    styles = "background-color:" + color + ";top:" + top + "em;left:" + left + "em;";
  }

  shape.classList.add(newShape);
  shape.setAttribute("style", styles);
  startTime = new Date().getTime();
}

function displayTime() {
  shape.classList.remove('square', 'circle', 'triangle');

  endTime = new Date().getTime();

  let timeTaken = (endTime - startTime) / 1000;
  reactionTime.innerHTML = timeTaken + " seconds!"
  startTime = new Date().getTime();

  if (playing) {
    generateShape();
  }
}
