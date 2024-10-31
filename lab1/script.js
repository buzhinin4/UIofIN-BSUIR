function bestPrompt(string) {
  let result = "";
  while (result === null || result.trim() === "" || result.length > 50) {
    result = prompt(string);
    if (result === null || result.trim() === "") {
      alert(
        "Ответ не может быть пустым! Пожалуйста, введите корректный ответ на заданный вопрос."
      );
    } else if (result.length > 50) {
      alert(
        "Ответ не может превышать 50 символов! Пожалуйста, введите корректный ответ на заданный вопрос."
      );
    }
  }
  return result;
}

const personalMovieDB = {
  count: 0,
  movies: { title: "", rate: 0 },
};

const numberOfFilms = bestPrompt("Сколько фильмов вы уже посмотрели?");
personalMovieDB.count = numberOfFilms;

const titleOfFilm = bestPrompt("Один из последних просмотренных фильмов?");
personalMovieDB.movies.title = titleOfFilm;

const rateOfFilm = bestPrompt("На сколько оцените его?");
personalMovieDB.movies.rate = rateOfFilm;

console.log(personalMovieDB);
