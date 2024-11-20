document.addEventListener("DOMContentLoaded", function () {
  let figureType = "line";
  let fillType = "fill";
  let fillColor = "#000000";
  let strokeColor = "#000000";
  let polygonAngles = 4;

  const canvas = document.querySelector(".workspace__canvas");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;

  document.querySelectorAll(".tools__choosing-figure").forEach((input) => {
    input.addEventListener("change", function () {
      figureType = this.value;
    });
  });

  document
    .querySelector(".polygon-angles-list")
    .addEventListener("change", function () {
      polygonAngles = parseInt(this.value, 10);
    });

  document
    .querySelector(".tools__fill-color-input")
    .addEventListener("input", function () {
      fillColor = this.value;
    });

  document.querySelectorAll(".tools__choosing-fill").forEach((input) => {
    input.addEventListener("change", function () {
      fillType = this.value;
    });
  });

  document
    .querySelector(".tools__stroke-color-input")
    .addEventListener("input", function () {
      strokeColor = this.value;
    });

  document
    .querySelector(".tools__clear-button")
    .addEventListener("click", function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

  canvas.addEventListener("mousedown", function (startE) {
    let startX = startE.clientX - rect.left;
    let startY = startE.clientY - rect.top;

    const drawPolygon = (endX, endY, sides) => {
      const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
      const angleStep = (2 * Math.PI) / sides;

      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const x = startX + radius * Math.cos(i * angleStep);
        const y = startY + radius * Math.sin(i * angleStep);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      applyStyles();
    };

    const applyStyles = () => {
      if (fillType === "fill") {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
    };

    const drawFigure = (endX, endY) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (figureType) {
        case "line":
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = strokeColor;
          ctx.stroke();
          break;

        case "ellipse":
          const radiusX = Math.abs(endX - startX) / 2;
          const radiusY = Math.abs(endY - startY) / 2;
          const centerX = (startX + endX) / 2;
          const centerY = (startY + endY) / 2;

          ctx.beginPath();
          ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
          applyStyles();
          break;

        case "circle":
          const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
          ctx.beginPath();
          ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
          applyStyles();
          break;

        case "rectangle": {
          const width = endX - startX;
          const height = endY - startY;

          ctx.beginPath();
          ctx.rect(startX, startY, width, height);
          applyStyles();
          break;
        }
        case "square": {
          const width = endX - startX;
          const height = width;

          ctx.beginPath();
          if (startX < endX && startY < endY) {
            ctx.rect(startX, startY, width, height);
          } else if (startX > endX && startY < endY) {
            ctx.rect(startX, startY, width, -height);
          } else if (startX > endX && startY > endY) {
            ctx.rect(startX, startY, width, height);
          } else {
            ctx.rect(startX, startY, width, -height);
          }

          applyStyles();
          break;
        }
        case "polygon":
          drawPolygon(endX, endY, polygonAngles);
          break;
      }
    };

    const onMouseMove = (moveE) => {
      const endX = moveE.clientX - rect.left;
      const endY = moveE.clientY - rect.top;
      drawFigure(endX, endY);
    };

    const onMouseUp = () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
  });
});
