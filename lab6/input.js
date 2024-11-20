const targetElements = document.getElementsByClassName("target");
const targetArray = Array.from(targetElements);

document.addEventListener("DOMContentLoaded", () => {
  let currentElement;
  let startTop;
  let startLeft;
  let isDrag;
  let startTouchY;
  let touchY;
  let startTouchX;
  let touchX;
  let startTouchY2;
  let touchY2;
  let startTouchX2;
  let touchX2;
  let minWidth = 50;
  let minHeight = 50;
  let isFollow;

  targetArray.forEach((element) => {
    element.addEventListener("touchstart", (start) => {
      isDrag = true;
      currentElement = start.target;
      startTop = currentElement.offsetTop;
      startLeft = currentElement.offsetLeft;
      startTouchY = touchY = start.touches[0].clientY;
      startTouchX = touchX = start.touches[0].clientX;
      console.log("im start");
    });

    document.addEventListener("touchstart", (start) => {
      if (touchY && touchX) {
        console.log("im second start");
        startTouchY2 = touchY2 = start.touches[0]
          ? start.touches[0].clientY
          : null;
        startTouchX2 = touchX2 = start.touches[0]
          ? start.touches[0].clientY
          : null;
      }
    });

    document.addEventListener("touchmove", (move) => {
      touchY = move.touches[0].clientY;
      touchX = move.touches[0].clientX;

      console.log("im move");

      if (touchY2 && touchX2) {
        touchY2 = move.touches[1].clientY;
        touchX2 = move.touches[1].clientX;
        resize(
          touchY,
          touchX,
          touchY2,
          touchX2,
          minHeight,
          minWidth,
          isFollow || isDrag,
          currentElement
        );
      } else {
        console.log("im drag");
        drag(touchY, touchX, isFollow || isDrag, currentElement);
      }
    });

    document.addEventListener("touchend", () => {
      console.log("im end");
      if (!(touchY2 && touchX2)) {
        if (startTouchY === touchY && startTouchX === touchX) {
          if (isFollow) {
            [isFollow, currentElement] = dropi(isFollow, currentElement);
            console.log("im end follow");
          } else {
            isFollow = true;
            console.log("im start follow");
          }
        } else if (!isFollow) {
          console.log("im drop");
          [isDrag, currentElement] = dropi(isDrag, currentElement);
        }

        startTouchY = startTouchX = touchY = touchX = null;
        startTouchY = startTouchX = touchY = touchX = null;
        startTouchY = startTouchX2 = touchY2 = touchX2 = null;
      } else if (startTouchY2 === touchY2 && startTouchX2 === touchX2) {
        drop(startTop, startLeft, isFollow || isDrag, currentElement);
        startTouchY2 = startTouchX2 = touchY2 = touchX2 = null;
      } else {
        startTouchY2 = startTouchX2 = touchY2 = touchX2 = null;
      }
    });
  });
});

function drag(touchY, touchX, isDrag, currentElement) {
  if (currentElement && isDrag) {
    currentElement.style.top = touchY + "px";
    currentElement.style.left = touchX + "px";
  }
}

function dropi(isDrag, currentElement) {
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

function resize(
  touchY,
  touchX,
  touchY2,
  touchX2,
  minHeight,
  minWidth,
  isDrag,
  currentElement
) {
  if (isDrag) {
    currentElement.style.height =
      Math.abs(touchY - touchY2) > minHeight
        ? Math.abs(touchY - touchY2)
        : minHeight + "px";
    currentElement.style.width =
      Math.abs(touchX - touchX2) > minWidth
        ? Math.abs(touchX - touchX2)
        : minWidth + "px";
  }
}
