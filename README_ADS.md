# Реклама на сайте Chatburg — как добавить объявление

Слот: одна карточка «Партнёры · Реклама» на главной (между скриншотами и командами), ротация каждые 15 с. Нужна картинка 300×250 и тексты headline / text / cta.
Всё управляется файлом **`ads.json`** — код трогать не нужно.

## Добавить рекламу
1. Положите картинку `img/ads/<id>_r.webp` (300×250, до 150 КБ).
2. Добавьте объект в массив `ads` в `ads.json`:
   ```json
   {"id": "mygame", "title": "My Game — demo в Steam", "link": "https://store.steampowered.com/app/123",
    "image_r": "img/ads/mygame_r.webp",
    "headline": "My Game", "text": "Короткое описание", "cta": "В Steam", "weight": 3, "start": "2026-11-01", "end": "2026-11-30"}
   ```
   * `weight` — как часто показывать (чем больше, тем чаще).
   * `start` / `end` — даты показа (необязательно). После `end` объявление пропадает само.
   * `rotate_seconds` (вверху файла) — период смены, по умолчанию 15 с.
3. `git add -A && git commit -m "ads: mygame" && git push` — GitHub Pages обновится за ~1 минуту.

Убрать рекламу — удалить объект (или поставить `end` в прошлом). Свои промо помечены `"house": true`.

## Правила
Только игры/гейминг/стриминг. Нельзя: 18+, казино/ставки, крипто-схемы, скам, политика. Заявки приходят на
evkakuypetrovich@gmail.com (форма на `ads.html`) или в Discord https://discord.gg/Z9u2evqPM.

## РСЯ (Яндекс) / Google AdSense
В конце `index.html` перед `<footer>` есть закомментированный блок.
1. Зарегистрируйтесь в РСЯ (partner.yandex.ru) или AdSense, добавьте сайт `evkakuypetrovich-sys.github.io/chatburg` и дождитесь одобрения.
2. Замените `R-A-XXXXXXX-1` / `ca-pub-XXXXXXXXXXXXXXXX` / `data-ad-slot` на свои ID и раскомментируйте блок.
3. Для AdSense положите в корень `ads.txt` со строкой `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
   Внимание: на `*.github.io` ads.txt должен лежать в корне домена — для AdSense лучше подключить свой домен (CNAME).
Сторонние скрипты замедляют сайт — подключайте их только после одобрения.
