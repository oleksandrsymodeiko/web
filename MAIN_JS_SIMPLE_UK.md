# Поточний main.js після спрощення

Ви уточнили бажаний варіант: залишаємо кнопку меню та наведений вами JS. Стан меню зберігається класом `is-open`, а не checkbox. HTML/CSS-перемикач застосований тільки до відеофону.

## Що залишилося в JS

```js
// Menu: open/close with the button and close after choosing a link.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function isOpen() {
    return nav.classList.contains('is-open');
  }

  toggle.addEventListener('click', function () {
    isOpen() ? closeNav() : openNav();
  });

  // Close after choosing a link — the menu shouldn't stay open on navigation.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
})();
```

- Перша IIFE ізолює змінні й одразу підключає меню.
- `toggle` — кнопка `.nav-toggle`; `nav` — `#primary-nav`.
- Перевірка `if` завершує частину, якщо потрібних елементів немає.
- `openNav` додає `is-open` і задає `aria-expanded="true"`.
- `closeNav` прибирає клас і задає `aria-expanded="false"`.
- `isOpen` повертає результат перевірки наявності класу.
- Обробник click кнопки вибирає відкриття або закриття.
- `querySelectorAll('a').forEach(...)` підключає закриття після кожного посилання меню, зберігаючи звичайний перехід за якорем.

Клавіатурна активація справжньої кнопки Enter/Space зберігається. Обробників Escape, кліку зовні та resize більше немає. Після зміни ширини відкритий стан не скидається автоматично.

## Відео без JS

У source тепер звичайний `src`, а не `data-src`. HTML-атрибути `autoplay muted loop playsinline` задають автоматичне тихе повторення всередині сторінки. Відео більше не залежить від класу `is-ready` і може завантажуватися до прокручування до секції. Автозапуск залежить від політики браузера.

Перед video стоїть checkbox `#hide-training-video`; після тексту — пов'язаний label «Hide video background». Прихований візуально checkbox доступний через Tab, а Space перемикає його. Видимий фокус малюється на label.

```css
.training__switch:checked ~ .training__video { display: none; }
```

`~` знаходить наступний елемент на тому самому рівні вкладеності. Увімкнений checkbox приховує відео й відкриває нерухомий постер, який завжди є фоном секції. Повторне натискання знову показує відео.

CSS лише приховує відео: він не викликає pause і не зупиняє завантаження MP4. Тепер також немає програмної паузи поза екраном або на прихованій вкладці. За prefers-reduced-motion CSS приховує ролик і непотрібний перемикач, але не гарантує відсутність запиту відеофайла.

## Форма до підключення сервісу

Видалено JS-обробник submit, динамічний status та його CSS. Кнопка submit тимчасово має `disabled`, поруч є пояснення англійською. Так валідна форма не зробить випадковий POST на поточну адресу #contact і не повідомить про нібито успішний запис.

Поля, labels, required, minlength та email-тип залишилися; заповнювати їх можна. Вимкнена кнопка не запускає процес надсилання та його стандартні підказки валідації. Коли розбиратимемо приймач, потрібно буде задати справжній action, прибрати disabled і змінити примітку. Форму зараз не можна вважати завершеною за вимогою реальної доставки заявки.

Попередній докладний розбір збережено в `MAIN_JS_EXPLAINED_UK.md` як історичний матеріал.
