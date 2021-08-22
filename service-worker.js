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
    "revision": "c1329413f788dba86fc45922273b6532"
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
    "url": "assets/js/10.c051be9e.js",
    "revision": "3fa78d706da840d267eadb5aa80613e1"
  },
  {
    "url": "assets/js/11.047a8a3d.js",
    "revision": "446bc28c5d4a9d23515e709dd15753e5"
  },
  {
    "url": "assets/js/12.d0d994c9.js",
    "revision": "f0055044a4d3d5597eecf72983c7b850"
  },
  {
    "url": "assets/js/13.c0ec5d72.js",
    "revision": "abe6220850f37f86e6380ca068071164"
  },
  {
    "url": "assets/js/14.a654b708.js",
    "revision": "ccd7dd6c9edfc28ba919d288a6bbc28d"
  },
  {
    "url": "assets/js/15.524135d7.js",
    "revision": "2281e0e4e67c788b8797b1a5ad11f741"
  },
  {
    "url": "assets/js/16.8a1f28ef.js",
    "revision": "7ff0db8ee0b9d8cbf664ebd1ea462b6f"
  },
  {
    "url": "assets/js/17.007e515d.js",
    "revision": "08f5e4121a5a10b990edcbd72fcd4dae"
  },
  {
    "url": "assets/js/18.7b295381.js",
    "revision": "c329dad647fd7086c3f13dbd6a46b124"
  },
  {
    "url": "assets/js/19.7a1849e2.js",
    "revision": "1b1060fef48197eb16680554036eade6"
  },
  {
    "url": "assets/js/2.853d6c8f.js",
    "revision": "f6d139769125c882340b2d951db6c9b6"
  },
  {
    "url": "assets/js/20.9eaac821.js",
    "revision": "24a19b0a214b70150a274bfa4dd97539"
  },
  {
    "url": "assets/js/21.e4cbf3b0.js",
    "revision": "2fd9f33565bb856cfcd10dac20f7362b"
  },
  {
    "url": "assets/js/3.101bc707.js",
    "revision": "04ae6d7a58144b85087e6a762bc7e7d8"
  },
  {
    "url": "assets/js/4.de962d2c.js",
    "revision": "f9c446085318cd40295b780c2feb2c04"
  },
  {
    "url": "assets/js/5.9fea13d6.js",
    "revision": "0eb9534e654ee2b376b8e2e76d6d1ec4"
  },
  {
    "url": "assets/js/6.7d07697a.js",
    "revision": "03f590df5ba95b8de486a91090789534"
  },
  {
    "url": "assets/js/7.d5bd5cf3.js",
    "revision": "e443443c1e019191968987f014f39b6e"
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
    "url": "assets/js/app.57607cba.js",
    "revision": "ebe4abb6f643fee6a5b1b4b95ca2cb4c"
  },
  {
    "url": "index.html",
    "revision": "a9922584ea9b17082bda2279d552307a"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "react/components/深入了解组件.html",
    "revision": "b42a937ef0622815139730aff79047e5"
  },
  {
    "url": "react/getting-start/基础.html",
    "revision": "1bf9c3612d052d5b88029df630cc18f1"
  },
  {
    "url": "react/hook/hook.html",
    "revision": "752a84bff7666b43c5690cc885613979"
  },
  {
    "url": "react/index.html",
    "revision": "394e47e31991281efa167e232175b397"
  },
  {
    "url": "react/reactive/响应式.html",
    "revision": "3831985499cd5a65076e718af9a14159"
  },
  {
    "url": "react/redux/深入redux.html",
    "revision": "cd1e99b37da301bb0348e6ed4d58ad52"
  },
  {
    "url": "vue-next/index.html",
    "revision": "6f0e32a6da9bab9d810259c003b97816"
  },
  {
    "url": "vue/index.html",
    "revision": "38600b0908b1c8bf32f4108ea3b1f528"
  },
  {
    "url": "vue/instance/index.html",
    "revision": "0f7cda51e855fb0fb72eaa1444964fcf"
  },
  {
    "url": "vue/instance/newVue初始化.html",
    "revision": "026138ac92d3f4251a00defb8ff1c156"
  },
  {
    "url": "vue/instance/Vue是什么.html",
    "revision": "3cb9c927a817d1049120327e73d7f389"
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
