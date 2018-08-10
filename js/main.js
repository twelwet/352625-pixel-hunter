'use strict';

// Константы клавиш <- и ->
const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;

// Контейнер для вставки слайдов игры:
const mainElement = document.querySelector(`#main`);

// Функция переключения сладов
const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

// Массив слайдов игры
const screens = [...document.querySelectorAll(`template`)];

/*
-- Содержимое массива экранов игры screenTemplates --
1. [0] - intro (Экран загрузки)
2. [1] - greeting (Приветственный экран, краткие правила игры)
3. [2] - rules (Экран начала игры, ввод имени)
4. [3] - game-1 (Игровой экран первого типа)
5. [4] - game-2 (Игровой экран второго типа)
6. [5] - game-3 (Игровой экран третьего типа)
7. [6] - stats (Экран с результатами)
8. [7] - modal-error (Экран с модалкой 404)
9. [8] - modal-confirm (Экран с модалкой начала игры заново)
----
*/

// Функция выбора следующего и предыдущего слайда
let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current].content);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

select(0);
