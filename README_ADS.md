# Реклама на сайте Chatburg — как добавить объявление

Слоты: боковые 160×600 (слева/справа, экраны ≥1500px) и встроенный 300×250 (между разделами, ноутбуки/телефоны).
Всё управляется файлом **`ads.json`** — код трогать не нужно.

## Добавить рекламу
1. Положите две картинки в `img/ads/`: `<id>_v.webp` (160×600) и `<id>_r.webp` (300×250), до 150 КБ каждая.
2. Добавьте объект в массив `ads` в `ads.json`:
   ```json
   {"id": "mygame", "title": "My Game — demo в Steam", "link": "https://store.steampowered.com/app/123",
    "image_v": "img/ads/mygame_v.webp", "image_r": "img/ads/mygame_r.webp",
    "weight": 3, "start": "2026-11-01", "end": "2026-11-30"}
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
В конце `index.html` и `versions.html` перед `<footer>` есть закомментированный блок.
1. Зарегистрируйтесь в РСЯ (partner.yandex.ru) или AdSense, добавьте сайт `evkakuypetrovich-sys.github.io/chatburg` и дождитесь одобрения.
2. Замените `R-A-XXXXXXX-1` / `ca-pub-XXXXXXXXXXXXXXXX` / `data-ad-slot` на свои ID и раскомментируйте блок.
3. Для AdSense положите в корень `ads.txt` со строкой `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
   Внимание: на `*.github.io` ads.txt должен лежать в корне домена — для AdSense лучше подключить свой домен (CNAME).
Сторонние скрипты замедляют сайт — подключайте их только после одобрения.
