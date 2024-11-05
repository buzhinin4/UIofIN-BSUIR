import { shirts } from "./shirts.js";

const catalogClothing = document.getElementById("catalogClothing");

function createCardClothing(shirt) {
  const cardClothing = document.createElement("div");
  cardClothing.className = "cardClothing";

  const cardClothingContent = document.createElement("div");
  cardClothingContent.className = "cardClothingContent";

  const imgClothing = document.createElement("div");
  imgClothing.className = "imgClothing";
  imgClothing.style.backgroundImage = `url(${
    shirt.colors[Object.keys(shirt.colors)[0]].front || shirt.default.front
  })`;

  const titleClothing = document.createElement("h3");
  titleClothing.className = "titleClothing";
  titleClothing.textContent = `${shirt.name}`;

  const availableColorsClothing = document.createElement("p");
  availableColorsClothing.className = "availableColorsClothing";
  availableColorsClothing.textContent = `Available in ${
    Object.keys(shirt.colors).length==1? ` 1 color` : `${Object.keys(shirt.colors).length} colors`
  }`;

  const btnsCardClothing = document.createElement("div");
  btnsCardClothing.className = "btnsCardClothing";

  const btnCardClothing1 = document.createElement("button");
  btnCardClothing1.className = "btnCardClothing";
  btnCardClothing1.textContent = `Quick View`;
  btnCardClothing1.onclick = () => quickView(shirt);

  const btnCardClothing2 = document.createElement("button");
  btnCardClothing2.className = "btnCardClothing";
  btnCardClothing2.textContent = `See Page`;

  btnsCardClothing.appendChild(btnCardClothing1);
  btnsCardClothing.appendChild(btnCardClothing2);

  cardClothingContent.appendChild(imgClothing);
  cardClothingContent.appendChild(titleClothing);
  cardClothingContent.appendChild(availableColorsClothing);
  cardClothingContent.appendChild(btnsCardClothing);

  cardClothing.appendChild(cardClothingContent);

  catalogClothing.appendChild(cardClothing);
}

function quickView(shirt) {
  const quickView = document.createElement("div");
  quickView.className = "quickView";

  const quickViewContent = document.createElement("div");
  quickViewContent.className = "quickViewContent";

  const quickViewContent__exitSpace = document.createElement("div");
  quickViewContent__exitSpace.className = "quickViewContent__exitSpace";

  const quickViewContent__exitSpace__exitButton =
    document.createElement("button");
  quickViewContent__exitSpace__exitButton.className =
    "quickViewContent__exitSpace__exitButton";
  quickViewContent__exitSpace__exitButton.textContent = "×";
  quickViewContent__exitSpace__exitButton.onclick = () => quickView.remove();

  const quickViewContent__clothingInfo = document.createElement("div");
  quickViewContent__clothingInfo.className = "quickViewContent__clothingInfo";

  let actualColor = Object.keys(shirt.colors)[0];
  let actualSide = "front";
  const quickViewContent__clothingInfo__img = document.createElement("div");
  quickViewContent__clothingInfo__img.className =
    "quickViewContent__clothingInfo__img";
  quickViewContent__clothingInfo__img.style.backgroundImage = `url(${
    shirt.colors[actualColor][actualSide] || shirt.default[actualSide]
  })`;

  const anonDiv = document.createElement("div");

  const quickViewContent__clothingInfo__title = document.createElement("h3");
  quickViewContent__clothingInfo__title.className =
    "quickViewContent__clothingInfo__title";
  quickViewContent__clothingInfo__title.textContent = `${shirt.name}`;

  const quickViewContent__clothingInfo__price = document.createElement("h4");
  quickViewContent__clothingInfo__price.className =
    "quickViewContent__clothingInfo__price";
  quickViewContent__clothingInfo__price.textContent = `${shirt.price}`;

  const quickViewContent__clothingInfo__colorsInfo =
    document.createElement("p");
  quickViewContent__clothingInfo__colorsInfo.className =
    "quickViewContent__clothingInfo__colorsInfo";
  quickViewContent__clothingInfo__colorsInfo.textContent = `Available in ${
    Object.keys(shirt.colors).length
  } colors`;

  const quickViewContent__clothingInfo__colors = document.createElement("div");
  quickViewContent__clothingInfo__colors.className =
    "quickViewContent__clothingInfo__colors";

  let quickViewContent__clothingInfo__colors__color_arr = [];
  Object.keys(shirt.colors).forEach((element) => {
    const quickViewContent__clothingInfo__colors__color =
      document.createElement("div");

    quickViewContent__clothingInfo__colors__color.className =
      actualColor == element
        ? "quickViewContent__clothingInfo__colors__color quickViewContent__clothingInfo__colors__activeColor"
        : "quickViewContent__clothingInfo__colors__color";

    quickViewContent__clothingInfo__colors__color.style.backgroundColor =
      element;

    quickViewContent__clothingInfo__colors__color.onclick = () => {
      quickViewContent__clothingInfo__colors__color_arr.forEach(
        (comp) =>
          (comp.className = "quickViewContent__clothingInfo__colors__color")
      );

      actualColor = element;
      quickViewContent__clothingInfo__colors__color.className =
        "quickViewContent__clothingInfo__colors__color quickViewContent__clothingInfo__colors__activeColor";

      quickViewContent__clothingInfo__img.style.backgroundImage = `url(${
        shirt.colors[element][actualSide] || shirt.default[actualSide]
      })`;
    };

    quickViewContent__clothingInfo__colors__color_arr.push(
      quickViewContent__clothingInfo__colors__color
    );

    quickViewContent__clothingInfo__colors.appendChild(
      quickViewContent__clothingInfo__colors__color
    );
  });

  const quickViewContent__clothingInfo__sides = document.createElement("div");
  quickViewContent__clothingInfo__sides.className =
    "quickViewContent__clothingInfo__sides";

  let quickViewContent__clothingInfo__sides__side_arr = [];
  Object.keys(shirt.colors[actualColor]).forEach((element) => {
    const quickViewContent__clothingInfo__sides__side =
      document.createElement("div");
    quickViewContent__clothingInfo__sides__side.className =
      "quickViewContent__clothingInfo__sides__side";

    quickViewContent__clothingInfo__sides__side.id =
      actualSide == element ? element : "";

    quickViewContent__clothingInfo__sides__side.textContent = element;

    quickViewContent__clothingInfo__sides__side.onclick = () => {
      quickViewContent__clothingInfo__sides__side_arr.forEach(
        (comp) => (comp.id = "")
      );

      actualSide = element;
      quickViewContent__clothingInfo__sides__side.id = element;
      quickViewContent__clothingInfo__img.style.backgroundImage = `url(${
        shirt.colors[actualColor][actualSide] || shirt.default[actualSide]
      })`;
    };

    quickViewContent__clothingInfo__sides__side_arr.push(
      quickViewContent__clothingInfo__sides__side
    );

    quickViewContent__clothingInfo__sides.appendChild(
      quickViewContent__clothingInfo__sides__side
    );
  });

  quickViewContent__exitSpace.appendChild(
    quickViewContent__exitSpace__exitButton
  );

  anonDiv.appendChild(quickViewContent__clothingInfo__title);
  anonDiv.appendChild(quickViewContent__clothingInfo__price);
  anonDiv.appendChild(quickViewContent__clothingInfo__colorsInfo);
  anonDiv.appendChild(quickViewContent__clothingInfo__colors);
  anonDiv.appendChild(quickViewContent__clothingInfo__sides);

  quickViewContent__clothingInfo.appendChild(
    quickViewContent__clothingInfo__img
  );
  quickViewContent__clothingInfo.appendChild(anonDiv);

  quickViewContent.appendChild(quickViewContent__exitSpace);
  quickViewContent.appendChild(quickViewContent__clothingInfo);

  quickView.appendChild(quickViewContent);

  document.body.appendChild(quickView);
}

shirts.forEach((shirt) => createCardClothing(shirt));
