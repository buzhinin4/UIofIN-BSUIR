const targetElements = document.getElementsByClassName("target");
const targetArray = Array.from(targetElements);

document.addEventListener("DOMContentLoaded", () => {
  let currentElement = null;
  let startTop = 0;
  let startLeft = 0;
  let isDragging = false;
  let isFollowing = false;

  let startTouchY1, startTouchX1, startTouchY2, startTouchX2;
  let touchY1, touchX1, touchY2, touchX2;
  const minWidth = 50;
  const minHeight = 50;

  targetArray.forEach((element) => {
    element.addEventListener("touchstart", (start) => {
      if (start.touches.length === 1) {
        const touch = start.touches[0];
        isDragging = true;
        currentElement = element;
        startTop = currentElement.offsetTop;
        startLeft = currentElement.offsetLeft;
        startTouchY1 = touchY1 = touch.clientY;
        startTouchX1 = touchX1 = touch.clientX;
      } else if (start.touches.length === 2) {
        const touch1 = start.touches[0];
        const touch2 = start.touches[1];
        startTouchY1 = touch1.clientY;
        startTouchX1 = touch1.clientX;
        startTouchY2 = touch2.clientY;
        startTouchX2 = touch2.clientX;
      }
    });

    document.addEventListener("touchmove", (move) => {
      if (!currentElement) return;

      if (move.touches.length === 1 && (isDragging || isFollowing)) {
        const touch = move.touches[0];
        touchY1 = touch.clientY;
        touchX1 = touch.clientX;
        currentElement.style.top = `${touchY1}px`;
        currentElement.style.left = `${touchX1}px`;
      } else if (move.touches.length === 2) {
        const touch1 = move.touches[0];
        const touch2 = move.touches[1];

        touchY1 = touch1.clientY;
        touchX1 = touch1.clientX;
        touchY2 = touch2.clientY;
        touchX2 = touch2.clientX;

        const height = Math.abs(touchY2 - touchY1);
        const width = Math.abs(touchX2 - touchX1);

        currentElement.style.height = `${Math.max(height, minHeight)}px`;
        currentElement.style.width = `${Math.max(width, minWidth)}px`;
      }
    });

    document.addEventListener("touchend", (end) => {
      if (!currentElement) return;

      if (end.touches.length === 0) {
        if (startTouchX1 == touchX1 && startTouchY1 == touchY1) {
          if (isFollowing) {
            isFollowing = false;
            currentElement = null;
          } else {
            isFollowing = true;
          }
        }
        if (isDragging) {
          isDragging = false;
          currentElement = null;
        }
        startTouchY1 = startTouchX1 = startTouchY2 = startTouchX2 = null;
      } else if (end.touches.length === 1) {
        if (startTouchY2 === touchY2 && startTouchX2 === touchX2) {
          isDragging = false;
          isFollowing = false;
          currentElement = null;
          currentElement.style.top = `${startTop}px`;
          currentElement.style.left = `${startLeft}px`;
          startTouchY1 = startTouchX1 = startTouchY2 = startTouchX2 = null;
        }
        startTouchY2 = startTouchX2 = null;
      }
    });
  });
});
