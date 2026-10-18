# Поточний main.js після спрощення

Ви уточнили бажаний варіант: залишаємо кнопку меню та наведений вами JS. Стан меню зберігається класом `is-open`, а не checkbox. Відео працює через HTML без окремого перемикача.

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

## Відео без JS та без кнопок

У HTML стоїть video з атрибутами autoplay, muted, loop, playsinline, poster і source зі звичайним src. Це HTML-атрибути, а не CSS-властивості. Autoplay — автоматичний запуск, muted — звук вимкнено, loop — повторення, playsinline — показ усередині сторінки на мобільному. Правильна назва — loop, не looped. Автозапуск залежить від політики браузера.

CSS розташовує video позаду тексту, задає object-fit:cover і затемнення. У режимі зменшеного руху CSS приховує відео, залишаючи постер. CSS не ставить ролик на паузу й не гарантує відсутності завантаження. Кнопки паузи/приховування, checkbox та їхніх стилів більше немає.

## Проста демонстраційна форма

Кнопка submit активна. Браузер сам перевіряє required, type=email і minlength=2; підписи та CSS-фокус збережені. Перевірку телефону за конкретним форматом не додано: він необов'язковий, а type=tel сам по собі не задає маску.

JS не обробляє форму. Після успішної вбудованої перевірки браузер виконає стандартне надсилання за action="#contact" з method="post" на поточну адресу сторінки. Це не приймач заявок: він не налаштований, листи не надсилаються, і статичний сервер може повернути помилку POST. Поруч із формою прямо написано, що надсилання не налаштоване. Так можна перевірити розмітку та валідацію лабораторної; підключення реальної доставки розглядатиметься окремо.

Попередній докладний розбір 131 рядка збережено в MAIN_JS_EXPLAINED_UK.md як історичний матеріал.
