/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "514fd0915ba8183c653a8133cdf71dad"
  },
  {
    "url": "assets/css/0.styles.199199a7.css",
    "revision": "f5aab5f35f8f9a78e9aa8fc00429abfd"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5c541b7c.js",
    "revision": "50a5d7e6dff4cf8631e4dc9ca02cafca"
  },
  {
    "url": "assets/js/11.fed2d000.js",
    "revision": "41e952b62a42a527f957977fd1b1696c"
  },
  {
    "url": "assets/js/12.21e55e11.js",
    "revision": "026beef713f6d2825d997cff0b5fd71b"
  },
  {
    "url": "assets/js/13.b32bf10d.js",
    "revision": "e7f50dc93380c7cdbe94381f7b3b2821"
  },
  {
    "url": "assets/js/14.8a063a1a.js",
    "revision": "b1476f029b361c5c06b00e869e262d75"
  },
  {
    "url": "assets/js/15.9b7e61b0.js",
    "revision": "e5dce2f12f2283e3adef8ea06b4b5255"
  },
  {
    "url": "assets/js/2.d01425c9.js",
    "revision": "c6f4e61aa62f7c7c6d208e5369bec2ed"
  },
  {
    "url": "assets/js/3.101bc707.js",
    "revision": "04ae6d7a58144b85087e6a762bc7e7d8"
  },
  {
    "url": "assets/js/4.f0684e3b.js",
    "revision": "4de23905ac278b93d3edc65453b5cb35"
  },
  {
    "url": "assets/js/5.fe4dfb56.js",
    "revision": "d643f2dfc928a0bd5284732ebeb1adf5"
  },
  {
    "url": "assets/js/6.b6b15352.js",
    "revision": "94675ba402001be365739e174f23b2de"
  },
  {
    "url": "assets/js/7.c04e8c3d.js",
    "revision": "46c0925d891a6709c7687f23254fdada"
  },
  {
    "url": "assets/js/8.602c3eb7.js",
    "revision": "f38754894d8a0b01783c6ede6d1191fd"
  },
  {
    "url": "assets/js/9.0ed41f5e.js",
    "revision": "b8e6d95bb7699d1c7dfac0ac40f12120"
  },
  {
    "url": "assets/js/app.5e38ded0.js",
    "revision": "9f01caa1293957ef666dc14b14434ece"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "react/index.html",
    "revision": "ea0a4c36377ef066b23baa80d4cfdc12"
  },
  {
    "url": "vue-next/index.html",
    "revision": "861192e48ae9cc7d7d56b7544ed8f240"
  },
  {
    "url": "vue/index.html",
    "revision": "04c9fc31bad76a6c2def9620cf4e6f4b"
  },
  {
    "url": "vue/instance/index.html",
    "revision": "ed58fcbed4ec31c57b2a8dc55f48a941"
  },
  {
    "url": "vue/instance/newVue初始化.html",
    "revision": "7628fadae800a9767f9cb8c24f804387"
  },
  {
    "url": "vue/instance/Vue是什么.html",
    "revision": "7a035b6d58e2451c7e09d2b0f4326aaa"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
