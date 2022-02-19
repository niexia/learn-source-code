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
    "revision": "910e309f590e42bcb5588685a605c833"
  },
  {
    "url": "assets/css/0.styles.c8f043b9.css",
    "revision": "121c7e38e2672a969e1f0a94ebbee568"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/vue-compile.c55d8a9b.png",
    "revision": "c55d8a9bbb1c8a5775650667ac354222"
  },
  {
    "url": "assets/img/vue-diff.b6729dfb.png",
    "revision": "b6729dfbb2052d0f46868f4908597df4"
  },
  {
    "url": "assets/img/vue-next-directory.63df2dac.png",
    "revision": "63df2dac864fd6234acf88f42b7223b4"
  },
  {
    "url": "assets/js/10.75239088.js",
    "revision": "0c7d7d4f3295c60e4dbdf8f1d603d3df"
  },
  {
    "url": "assets/js/11.9ef25918.js",
    "revision": "09ce278f98e14df4aba2f905f57bec55"
  },
  {
    "url": "assets/js/12.f679cde6.js",
    "revision": "bb434b95009e5f55da6a42bbb876286e"
  },
  {
    "url": "assets/js/13.327c58a4.js",
    "revision": "8adb863ec38a0973afd410e5da04474b"
  },
  {
    "url": "assets/js/14.41981968.js",
    "revision": "b038dc39cf1b2a93ef2f159bcf0394c5"
  },
  {
    "url": "assets/js/15.27ff814c.js",
    "revision": "a9d93af85a3bc12dafdac91b28b61e66"
  },
  {
    "url": "assets/js/16.45a13a5b.js",
    "revision": "79426278293ada40bc2a2923e479456a"
  },
  {
    "url": "assets/js/17.f8768f9a.js",
    "revision": "d005d5c79bac8fd577f4e925b4aec6f5"
  },
  {
    "url": "assets/js/18.7b295381.js",
    "revision": "c329dad647fd7086c3f13dbd6a46b124"
  },
  {
    "url": "assets/js/19.c19b4b5a.js",
    "revision": "dd0ca57185d8da5c78a3e3e54e3b4f87"
  },
  {
    "url": "assets/js/2.0f9babf1.js",
    "revision": "de32e3aa90a2537bc13554cc83b8a751"
  },
  {
    "url": "assets/js/20.a5959386.js",
    "revision": "4e66d74d72f1b92b191274c8abfb6dc1"
  },
  {
    "url": "assets/js/21.2d31fefd.js",
    "revision": "4fe9fb7b10f4436a745279eeb4a9121c"
  },
  {
    "url": "assets/js/3.e50c4eba.js",
    "revision": "e7b2109d80c7cb95e6074e39fdabeb5b"
  },
  {
    "url": "assets/js/4.82133233.js",
    "revision": "f006b8ab5a439abe97c4c797f7165aa2"
  },
  {
    "url": "assets/js/5.601c0259.js",
    "revision": "2e959443ba42d683937519dacddbdebe"
  },
  {
    "url": "assets/js/6.baa84aa3.js",
    "revision": "2b85a80f891203378d52fe30d718bd33"
  },
  {
    "url": "assets/js/7.ef0c02e4.js",
    "revision": "e450e8ca95f5e5391b4f1027ea3f9a54"
  },
  {
    "url": "assets/js/8.726d0783.js",
    "revision": "e05baddbb2e039a5be5485a566556b1e"
  },
  {
    "url": "assets/js/9.e75944e9.js",
    "revision": "dc1cd615a47f830379d5cac821a501a0"
  },
  {
    "url": "assets/js/app.e31e0db2.js",
    "revision": "41b7212680f2ad21b83a59559786fdde"
  },
  {
    "url": "images/vue-compile.png",
    "revision": "c55d8a9bbb1c8a5775650667ac354222"
  },
  {
    "url": "images/vue-diff.png",
    "revision": "b6729dfbb2052d0f46868f4908597df4"
  },
  {
    "url": "images/vue-next-directory.png",
    "revision": "63df2dac864fd6234acf88f42b7223b4"
  },
  {
    "url": "index.html",
    "revision": "7ff4afcb2eeeb8b0938e624f7c738f39"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "react/components/深入了解组件.html",
    "revision": "7476173a6c6f9750c2cf196d67bb1ad2"
  },
  {
    "url": "react/getting-start/基础.html",
    "revision": "9decb673509074e27c1c1385db8ce591"
  },
  {
    "url": "react/hook/hook.html",
    "revision": "28f4c900006e33a0c757ff6d93da8a4a"
  },
  {
    "url": "react/index.html",
    "revision": "f813ac530a27ff91367d15cf4819f02d"
  },
  {
    "url": "react/reactive/响应式.html",
    "revision": "f2dd091103b1a9ab9b568e65d5abf96f"
  },
  {
    "url": "react/redux/深入redux.html",
    "revision": "78449c786e02cd256905c32e2ca01bef"
  },
  {
    "url": "vue-next/index.html",
    "revision": "6958ef01b09482b93a842c7d3e75cf5e"
  },
  {
    "url": "vue/index.html",
    "revision": "e51e45fe5f5d7d4e745916ee1586bebf"
  },
  {
    "url": "vue/instance/index.html",
    "revision": "e811201f59e165ed252c133e2f3be414"
  },
  {
    "url": "vue/instance/newVue初始化.html",
    "revision": "ecb641ae362134057a77450120c0d698"
  },
  {
    "url": "vue/instance/Vue是什么.html",
    "revision": "d695633d12cdbe28bb9c8c374ad7c3dc"
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
