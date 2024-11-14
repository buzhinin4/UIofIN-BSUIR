const targetElements = document.getElementsByClassName("target");
const targetArray = Array.from(targetElements);

document.addEventListener("DOMContentLoaded", () => {
  let currentElement = null;
  let startTop;
  let startLeft;
  let isDrag = false;

  //1
  targetArray.forEach((element) => {
    element.addEventListener("mousedown", (e) => {
      isDrag = true;
      currentElement = e.target;
      startTop = currentElement.offsetTop;
      startLeft = currentElement.offsetLeft;
      currentElement.style.backgroundColor = "blue";

      document.addEventListener("mousemove", (cursor) =>
        drag(cursor, isDrag, currentElement)
      );
      document.addEventListener(
        "mouseup",
        () => ([isDrag, currentElement] = dropi(isDrag, currentElement))
      );
      document.addEventListener("keydown", (activeKey) => {
        if (activeKey.key === "Escape") {
          [isDrag, currentElement] = drop(
            startTop,
            startLeft,
            isDrag,
            currentElement
          );
        }
      });
    });

    element.addEventListener("dblclick", (e) => {
      isDrag = true;
      currentElement = e.target;
      startTop = currentElement.offsetTop;
      startLeft = currentElement.offsetLeft;
      currentElement.style.backgroundColor = "blue"; //вопрос со сменой цвета

      document.addEventListener("mousemove", (cursor) =>
        drag(cursor, isDrag, currentElement)
      );
      document.addEventListener(
        "mouseup",
        () => ([isDrag, currentElement] = drop(isDrag, currentElement))
      );
      document.addEventListener("keydown", (activeKey) => {
        if (activeKey.key === "Escape") {
          [isDrag, currentElement] = drop(
            startTop,
            startLeft,
            isDrag,
            currentElement
          );
        }
      });
    });
  });
});

function drag(e, isDrag, currentElement) {
  if (currentElement && isDrag) {
    currentElement.style.top = e.clientY + "px";
    currentElement.style.left = e.clientX + "px";
  }
}

function dropi(isDrag, currentElement) {
  if (isDrag) {
    currentElement.style.backgroundColor = "";
    currentElement = null;
    isDrag = false;
  }
  return [isDrag, currentElement];
}

function drop(startTop, startLeft, isDrag, currentElement) {
  if (isDrag) {
    currentElement.style.backgroundColor = "";
    currentElement.style.top = startTop + "px";
    currentElement.style.left = startLeft + "px";
    currentElement = null;
    isDrag = false;
  }
  return [isDrag, currentElement];
}
