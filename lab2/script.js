const personalMovieDB = {
  privat: true,
  movies: {
    title: "Дэдпул 3",
    rate: 4,
    describe:
      "Страх перед другими странами, которые могут отодвинуть США в сторону на мировой арене, толкают его правительство искать мощные факты превосходства. Чтобы доказать это требуются весомые аргументы с возможностями которым обладает лишь сверхновое оружие. Один из таких военных проектов стал Дэдпул - наёмный солдат, обладающий суперспособностями и способный заменить целую армию. Однако подопытный герой стал отходить в сторону от предназначенной для него цели, имея явные проблемы со своим внутренним миром...",
  },
};

const parent = document.getElementById("parent");
const table = document.createElement("table");

if (personalMovieDB.privat === true) {
  for (const key in personalMovieDB.movies) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.textContent = key;
    td.textContent = personalMovieDB.movies[key];
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
  }
  parent.appendChild(table);
}
