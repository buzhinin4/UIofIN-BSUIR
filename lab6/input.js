const targetElements = document.getElementsByClassName("target");
const targetArray = Array.from(targetElements);

document.addEventListener("DOMContentLoaded", () => {
  let currentElement = null;
  let startTop;
  let startLeft;
  let isDrag = false;

  targetArray.forEach((element) => {
    element.addEventListener("touchstart", (e) => {
      element.addEventListener("touchstart", (e1) => {
        if (e.clientX == e1.clientX && e.clientY == e1.clientY) {
          isDrag = true;
          currentElement = e.target;
          startTop = currentElement.offsetTop;
          startLeft = currentElement.offsetLeft;

          document.addEventListener("touchmove", (cursor) =>
            drag(cursor, isDrag, currentElement)
          );

          document.addEventListener(
            "mouseup",
            () => ([isDrag, currentElement] = drop(isDrag, currentElement))
          );

          document.addEventListener("touchstart", (touchstart1) => {
            document.addEventListener("touchstart", (touchstart2) => {
              document.addEventListener("touchmove", (cursor) =>
                resize(
                  touchstart1.clientX,
                  touchstart1.clientY,
                  cursor.clientX,
                  cursor.clientY,
                  isDrag,
                  currentElement,
                  50,
                  50
                )
              );
              document.addEventListener("touchend", (touchend) => {
                if (
                  touchstart2.clientX == touchend.clientX &&
                  touchstart2.clientY == touchend.clientY
                ) {
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

function drop(isDrag, currentElement) {
  if (isDrag) {
    currentElement = null;
    isDrag = false;
  }
  return [isDrag, currentElement];
}

function drop(startTop, startLeft, isDrag, currentElement) {
  if (isDrag) {
    currentElement.style.top = startTop + "px";
    currentElement.style.left = startLeft + "px";
    currentElement = null;
    isDrag = false;
  }
  return [isDrag, currentElement];
}

function resizing(
  firstTouchX,
  firstTouchY,
  secondTouchX,
  secondTouchY,
  isDrag,
  currentElement,
  minWidth,
  minHeight
) {
  if (isDrag) {
    currentElement.style.width =
      (Math.abs(firstTouchX - secondTouchX) > minWidth
        ? Math.abs(firstTouchX - secondTouchX)
        : minWidth) + "px";
    currentElement.style.height =
      (Math.abs(firstTouchY - secondTouchY) > minHeight
        ? Math.abs(firstTouchY - secondTouchY)
        : minHeight) + "px";
  }
}
