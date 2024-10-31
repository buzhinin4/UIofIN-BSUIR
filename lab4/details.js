function actualClothe(shirt) {
  const actualClothe = document.createElement("div");
  actualClothe.className = "actualClothe";

  const actualClothe__name = document.createElement("h1");
  actualClothe__name.className = "actualClothe__name";
  actualClothe__name.textContent = shirt.name;

  const actualClothe__info = document.createElement("div");
  actualClothe__info.className = "actualClothe__info";

  let actualColor = Object.keys(shirt.colors)[0];
  let actualSide = "front";
  const actualClothe__img = document.createElement("div");
  actualClothe__img.className = "actualClothe__img";
  actualClothe__img.style.backgroundImage = `url(${
    shirt.colors[actualColor][actualSide] || shirt.default[actualSide]
  })`;

  const anonDiv = document.createElement("div");

  const actualClothe__price = document.createElement("h2");
  actualClothe__price.className = "actualClothe__price";
  actualClothe__price.textContent = `${shirt.price}`;

  const actualClothe__descriptionText = document.createElement("h4");
  actualClothe__descriptionText.className = "actualClothe__descriptionText";
  actualClothe__descriptionText.textContent = "Description:";

  const actualClothe__description = document.createElement("p");
  actualClothe__description.className = "actualClothe__description";
  actualClothe__description.textContent = shirt.description;

  const actualClothe__colorsText = document.createElement("h4");
  actualClothe__colorsText.className = "actualClothe__colorsText";
  actualClothe__colorsText.textContent = `Available in ${
    Object.keys(shirt.colors).length
  } colors`;

  const actualClothe__colors = document.createElement("div");
  actualClothe__colors.className = "actualClothe__colors";

  let actualClothe__colors__color_arr = [];
  Object.keys(shirt.colors).forEach((element) => {
    const actualClothe__colors__color = document.createElement("div");

    actualClothe__colors__color.className =
      actualColor == element
        ? "actualClothe__colors__color actualClothe__colors__activeColor"
        : "actualClothe__colors__color";

    actualClothe__colors__color.style.backgroundColor = element;

    actualClothe__colors__color.onclick = () => {
      actualClothe__colors__color_arr.forEach(
        (comp) => (comp.className = "actualClothe__colors__color")
      );

      actualColor = element;
      actualClothe__colors__color.className =
        "actualClothe__colors__color actualClothe__colors__activeColor";

      actualClothe__img.style.backgroundImage = `url(${
        shirt.colors[element][actualSide] || shirt.default[actualSide]
      })`;
    };

    actualClothe__colors__color_arr.push(actualClothe__colors__color);

    actualClothe__colors.appendChild(actualClothe__colors__color);
  });

  const actualClothe__sidesText = document.createElement("h4");
  actualClothe__sidesText.className = "actualClothe__colorsText";
  actualClothe__sidesText.textContent = `Choose side`;

  const actualClothe__sides = document.createElement("div");
  actualClothe__sides.className = "actualClothe__sides";

  let actualClothe__sides__side_arr = [];
  Object.keys(shirt.colors[actualColor]).forEach((element) => {
    const actualClothe__sides__side = document.createElement("div");
    actualClothe__sides__side.className = "actualClothe__sides__side";

    actualClothe__sides__side.id = actualSide == element ? element : "";

    actualClothe__sides__side.textContent = element;

    actualClothe__sides__side.onclick = () => {
      actualClothe__sides__side_arr.forEach((comp) => (comp.id = ""));

      actualSide = element;
      actualClothe__sides__side.id = element;
      actualClothe__img.style.backgroundImage = `url(${
        shirt.colors[actualColor][actualSide] || shirt.default[actualSide]
      })`;
    };

    actualClothe__sides__side_arr.push(actualClothe__sides__side);

    actualClothe__sides.appendChild(actualClothe__sides__side);
  });

  anonDiv.appendChild(actualClothe__price);
  anonDiv.appendChild(actualClothe__descriptionText);
  anonDiv.appendChild(actualClothe__description);
  anonDiv.appendChild(actualClothe__colorsText);
  anonDiv.appendChild(actualClothe__colors);
  anonDiv.appendChild(actualClothe__sidesText);
  anonDiv.appendChild(actualClothe__sides);

  actualClothe__info.appendChild(actualClothe__img);
  actualClothe__info.appendChild(anonDiv);

  actualClothe.appendChild(actualClothe__name);
  actualClothe.appendChild(actualClothe__info);

  document.body.appendChild(actualClothe);
}

if (JSON.parse(localStorage.getItem("actualClothe"))) {
  actualClothe(JSON.parse(localStorage.getItem("actualClothe")));
} else {
  window.location.href = "index.html";
}
