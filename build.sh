#!/usr/bin/env bash
# Regenerates the self-contained index.html from src/*.jsx
set -euo pipefail
cd "$(dirname "$0")"
OUT=index.html

cat > "$OUT" <<'HTMLHEAD'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow, noarchive" />
<title>The Excelsior Club — Members' App</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Libre+Caslon+Display&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Marcellus&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; }
  body {
    background: #1A1A1C;
    background-image: radial-gradient(circle at 50% 0%, #26262A, #141416 70%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; padding: 24px; overflow: hidden;
    font-family: "Hanken Grotesk", system-ui, sans-serif;
  }
  #root { transform-origin: center center; }
  /* scale device to fit viewport */
  @media (max-height: 940px) {
    #root { transform: scale(calc((100vh - 48px) / 874)); }
  }
  div::-webkit-scrollbar { width: 0; height: 0; }
  div { scrollbar-width: none; }
  button { -webkit-tap-highlight-color: transparent; }
  @keyframes exSlideIn { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes exSlideOut { from { opacity: 0; transform: translateX(-22px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes exFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
</style>
</head>
<body>
<div id="root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

HTMLHEAD

for f in ios-frame.jsx tweaks-panel.jsx theme.jsx data.jsx screens1.jsx screens2.jsx screens3.jsx app.jsx; do
  printf '<script type="text/babel" data-presets="react" data-source="%s">\n' "$f" >> "$OUT"
  cat "src/$f" >> "$OUT"
  printf '\n</script>\n\n' >> "$OUT"
done

cat >> "$OUT" <<'HTMLFOOT'
</body>
</html>
HTMLFOOT

# Mirror to the /tmp serving dir used by the preview server
mkdir -p /tmp/excelsior-app
cp "$OUT" /tmp/excelsior-app/index.html
echo "built $OUT ($(wc -c < "$OUT") bytes) and mirrored to /tmp/excelsior-app"
