<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="/favicon.png" />

  <title>{{ env('APP_NAME') }}</title>

  <meta name="description" content="{{ $meta['description'] }}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ $meta['url'] }}">
  <meta property="og:title" content="{{ $meta['title'] }}">
  <meta property="og:description" content="{{ $meta['description'] }}">
  <meta property="og:image" content="{{ $meta['image'] }}">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10878664178"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'AW-10878664178');
  </script>
</head>

<body>
  <div id="root"></div>
  @viteReactRefresh
  @vite('resources/src/index.tsx')
</body>

</html>
