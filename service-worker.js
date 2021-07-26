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
    "revision": "1bef3dc17f6cc3abb67db05803974ca5"
  },
  {
    "url": "assets/css/0.styles.bc74f0fd.css",
    "revision": "b010d16824a9f5f45599c325d8f1edae"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.ff913598.js",
    "revision": "1ce702194e21b2838c5ed590f000cedd"
  },
  {
    "url": "assets/js/11.435a7e36.js",
    "revision": "3350e5714735d8cc0045451764d75ee2"
  },
  {
    "url": "assets/js/12.c044b387.js",
    "revision": "c0c9de954cd34bf875de1bec883fa8cb"
  },
  {
    "url": "assets/js/13.81d4a5ea.js",
    "revision": "82351adcd4ba5f1b488cc7ef21828003"
  },
  {
    "url": "assets/js/14.9c78a128.js",
    "revision": "58244e8622d413d1898a197c9769e95e"
  },
  {
    "url": "assets/js/2.6670c113.js",
    "revision": "914a26824640f4e5bf0f006ffd0a976b"
  },
  {
    "url": "assets/js/3.101bc707.js",
    "revision": "04ae6d7a58144b85087e6a762bc7e7d8"
  },
  {
    "url": "assets/js/4.a26752d3.js",
    "revision": "38bfa41901f9633f516db2ecf2462d41"
  },
  {
    "url": "assets/js/5.3240dd6f.js",
    "revision": "4308f7cecc80be611e0b261938e351b5"
  },
  {
    "url": "assets/js/6.3e27a8a9.js",
    "revision": "acd3616a9c50e63ae881d665623e6cb9"
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
    "url": "assets/js/9.094ba49f.js",
    "revision": "dd674a104069136044acf60221b6cd80"
  },
  {
    "url": "assets/js/app.a91dd84a.js",
    "revision": "c7234bd552d6c3fb5e0ea25d5874ef08"
  },
  {
    "url": "index.html",
    "revision": "c5d3f1545c27dab03e9b2516055a4371"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "vue/index.html",
    "revision": "db812e2b22973f4ddbb2e11dde38c96d"
  },
  {
    "url": "vue/instance/index.html",
    "revision": "b071e5709f1883b4a7feb5215b486906"
  },
  {
    "url": "vue/instance/newVue初始化.html",
    "revision": "ce8aa5dd3f8731194bb010adf63ebb9c"
  },
  {
    "url": "vue/instance/Vue是什么.html",
    "revision": "206ad53583aeaa18d90fb99523b0e9f7"
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
