document.addEventListener("DOMContentLoaded", function () {
  let figureType = "line";
  let fillType = "fill";
  let fillColor = "#000000";
  let strokeColor = "#000000";
  let polygonAngles = 4;

  const svg = document.querySelector(".workspace__svg");

  document.querySelectorAll(".tools__choosing-figure").forEach((input) => {
    input.addEventListener("change", function () {
      figureType = this.value;
    });
  });

  document
    .querySelector(".polygon-angles-list")
    .addEventListener("change", function () {
      polygonAngles = parseInt(this.value, 10);
      console.log(polygonAngles);
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
      lines = document.querySelectorAll("line");
      ellipses = document.querySelectorAll("ellipse");
      polygons = document.querySelectorAll("polygon");

      lines.forEach((line) => {
        svg.removeChild(line);
      });

      ellipses.forEach((ellipse) => {
        svg.removeChild(ellipse);
      });

      polygons.forEach((polygon) => {
        svg.removeChild(polygon);
      });
    });

  svg.addEventListener("mousedown", function (startE) {
    const rect = svg.getBoundingClientRect();
    let startX = startE.clientX - rect.left;
    let startY = startE.clientY - rect.top;

    switch (figureType) {
      case "line":
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", startX);
        line.setAttribute("y2", startY);
        line.setAttribute("stroke", strokeColor);
        svg.appendChild(line);

        let lastLine =
          document.querySelectorAll("line")[
            document.querySelectorAll("line").length - 1
          ];

        const startCreateLine = function (moveE) {
          lastLine.setAttribute("x2", moveE.clientX - rect.left);
          lastLine.setAttribute("y2", moveE.clientY - rect.top);
        };

        const endCreateLine = function () {
          svg.removeEventListener("mousemove", startCreateLine);
        };

        svg.addEventListener("mousemove", startCreateLine);
        svg.addEventListener("mouseup", endCreateLine);
        break;

      case "ellipse":
        const ellipse = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "ellipse"
        );
        ellipse.setAttribute("cx", startX);
        ellipse.setAttribute("cy", startY);
        ellipse.setAttribute("rx", 1);
        ellipse.setAttribute("ry", 1);
        if (fillType === "fill") {
          ellipse.setAttribute("fill", fillColor);
        } else {
          ellipse.setAttribute("fill", "white");
        }
        ellipse.setAttribute("stroke", strokeColor);
        svg.appendChild(ellipse);

        let lastEllipse =
          document.querySelectorAll("ellipse")[
            document.querySelectorAll("ellipse").length - 1
          ];
        const startCreateEllipse = function (moveE) {
          lastEllipse.setAttribute(
            "rx",
            Math.abs(moveE.clientX - startX - rect.left)
          );
          lastEllipse.setAttribute(
            "ry",
            Math.abs(moveE.clientY - startY - rect.top)
          );
        };
        const endCreateEllipse = function () {
          svg.removeEventListener("mousemove", startCreateEllipse);
          svg.removeEventListener("mouseup", endCreateEllipse);
        };
        svg.addEventListener("mousemove", startCreateEllipse);
        svg.addEventListener("mouseup", endCreateEllipse);
        break;
      case "circle":
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        circle.setAttribute("cx", startX);
        circle.setAttribute("cy", startY);
        circle.setAttribute("r", 1);
        if (fillType === "fill") {
          circle.setAttribute("fill", fillColor);
        } else {
          circle.setAttribute("fill", "white");
        }
        circle.setAttribute("stroke", strokeColor);
        svg.appendChild(circle);

        let lastCircle =
          document.querySelectorAll("circle")[
            document.querySelectorAll("circle").length - 1
          ];
        const startCreateCircle = function (moveE) {
          lastCircle.setAttribute(
            "r",
            Math.abs(moveE.clientX - startX - rect.left)
          );
        };
        const endCreateCircle = function () {
          svg.removeEventListener("mousemove", startCreateCircle);
          svg.removeEventListener("mouseup", endCreateCircle);
        };
        svg.addEventListener("mousemove", startCreateCircle);
        svg.addEventListener("mouseup", endCreateCircle);
        break;
      case "rectangle":
        const rectangle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        if (fillType === "fill") {
          rectangle.setAttribute("fill", fillColor);
        } else {
          rectangle.setAttribute("fill", "white");
        }
        rectangle.setAttribute("stroke", strokeColor);
        svg.appendChild(rectangle);

        const updateRectanglePoints = function (moveE) {
          const points = [];
          points.push(`${startX},${startY}`);
          points.push(`${moveE.clientX - rect.left},${startY}`);
          points.push(
            `${moveE.clientX - rect.left},${moveE.clientY - rect.top}`
          );
          points.push(`${startX},${moveE.clientY - rect.top}`);
          rectangle.setAttribute("points", points.join(" "));
        };
        const startCreateRectangle = function (moveE) {
          updateRectanglePoints(moveE);
        };

        const endCreateRectangle = function () {
          svg.removeEventListener("mousemove", startCreateRectangle);
          svg.removeEventListener("mouseup", endCreateRectangle);
        };

        svg.addEventListener("mousemove", startCreateRectangle);
        svg.addEventListener("mouseup", endCreateRectangle);
        break;

      case "square":
        const square = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        if (fillType === "fill") {
          square.setAttribute("fill", fillColor);
        } else {
          square.setAttribute("fill", "white");
        }
        square.setAttribute("stroke", strokeColor);
        svg.appendChild(square);

        const updateSquarePoints = function (moveE) {
          const points = [];
          points.push(`${startX},${startY}`);
          points.push(`${moveE.clientX - rect.left},${startY}`);
          if (
            startY < moveE.clientY - rect.top &&
            startX < moveE.clientX - rect.left
          ) {
            points.push(
              `${moveE.clientX - rect.left},${
                startY + (moveE.clientX - rect.left - startX)
              }`
            );
            points.push(
              `${startX},${startY + (moveE.clientX - rect.left - startX)}`
            );
          } else if (
            startY < moveE.clientY - rect.top &&
            startX > moveE.clientX - rect.left
          ) {
            points.push(
              `${moveE.clientX - rect.left},${
                startY - (moveE.clientX - rect.left - startX)
              }`
            );
            points.push(
              `${startX},${startY - (moveE.clientX - rect.left - startX)}`
            );
          } else if (
            startY > moveE.clientY - rect.top &&
            startX > moveE.clientX - rect.left
          ) {
            points.push(
              `${moveE.clientX - rect.left},${
                startY + (moveE.clientX - rect.left - startX)
              }`
            );
            points.push(
              `${startX},${startY + (moveE.clientX - rect.left - startX)}`
            );
          } else if (
            startY > moveE.clientY - rect.top &&
            startX < moveE.clientX - rect.left
          ) {
            points.push(
              `${moveE.clientX - rect.left},${
                startY - (moveE.clientX - rect.left - startX)
              }`
            );
            points.push(
              `${startX},${startY - (moveE.clientX - rect.left - startX)}`
            );
          }
          square.setAttribute("points", points.join(" "));
        };
        const startCreateSquare = function (moveE) {
          updateSquarePoints(moveE);
        };

        const endCreateSquare = function () {
          svg.removeEventListener("mousemove", startCreateSquare);
          svg.removeEventListener("mouseup", endCreateSquare);
        };

        svg.addEventListener("mousemove", startCreateSquare);
        svg.addEventListener("mouseup", endCreateSquare);
        break;
      case "polygon":
        const polygon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        if (fillType === "fill") {
          polygon.setAttribute("fill", fillColor);
        } else {
          polygon.setAttribute("fill", "white");
        }
        polygon.setAttribute("stroke", strokeColor);
        svg.appendChild(polygon);

        const updatePolygonPoints = function (moveE, angles) {
          const radius = Math.sqrt(
            Math.pow(moveE.clientX - startX - rect.left, 2) +
              Math.pow(moveE.clientY - startY - rect.top, 2)
          );

          const points = [];
          for (let i = 0; i < angles; i++) {
            const angle = (2 * Math.PI * i) / angles; // Угол для текущей вершины
            const x = startX + radius * Math.cos(angle);
            const y = startY + radius * Math.sin(angle);
            points.push(`${x},${y}`);
          }
          polygon.setAttribute("points", points.join(" "));
        };

        const startCreatePolygon = function (moveE) {
          updatePolygonPoints(moveE, polygonAngles);
        };

        const endCreatePolygon = function () {
          svg.removeEventListener("mousemove", startCreatePolygon);
          svg.removeEventListener("mouseup", endCreatePolygon);
        };

        svg.addEventListener("mousemove", startCreatePolygon);
        svg.addEventListener("mouseup", endCreatePolygon);
        break;
    }
  });
});
