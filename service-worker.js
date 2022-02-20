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
    "revision": "9fc1722968bfb717d6385b041f739134"
  },
  {
    "url": "assets/css/0.styles.e9f4b8bc.css",
    "revision": "c24884a9707805830d747f1373f4d0d6"
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
    "url": "assets/img/vue-next-vnode-to-dom.b38b14f8.png",
    "revision": "b38b14f8bda9d2decb919fd7beee3d07"
  },
  {
    "url": "assets/js/10.10ee216b.js",
    "revision": "af2718696ff7841817420ddeb7c39fd4"
  },
  {
    "url": "assets/js/11.48dddc26.js",
    "revision": "7159f3285bdf51cb9a46dd39eb2539b6"
  },
  {
    "url": "assets/js/12.b29689ef.js",
    "revision": "4dd41121a49aea6809483b5769100621"
  },
  {
    "url": "assets/js/13.83e6c56b.js",
    "revision": "40644b0a5b1fb358e9330f4c5774707d"
  },
  {
    "url": "assets/js/14.455b74c1.js",
    "revision": "2cbe93f484faa918e82ddb9746ef923a"
  },
  {
    "url": "assets/js/15.aaaf0668.js",
    "revision": "3e3f3f0ef9db547af689e19e66ee477b"
  },
  {
    "url": "assets/js/16.76b566e7.js",
    "revision": "d068c2a65e298da3ca40142d6c3fc263"
  },
  {
    "url": "assets/js/17.b60bd07b.js",
    "revision": "9b9f73ad3341e2a37aeca30d1e4e166e"
  },
  {
    "url": "assets/js/18.c1d13045.js",
    "revision": "ceb8b8a8b44eb52b7c6a041c94e15fa4"
  },
  {
    "url": "assets/js/19.e5663e4c.js",
    "revision": "86ad6591239c320a9511fd7cb85431ab"
  },
  {
    "url": "assets/js/2.2fe9e6fa.js",
    "revision": "2d5466b4f6d3effbcef3c11a0d59062d"
  },
  {
    "url": "assets/js/20.c820a6bd.js",
    "revision": "916bc824c70d88eaa1c718ce88592af2"
  },
  {
    "url": "assets/js/21.84a6a02b.js",
    "revision": "19c3a68bc90733f6a01c4c9c924a092a"
  },
  {
    "url": "assets/js/22.01258c55.js",
    "revision": "b1eccb75c150e6d0329cdd0541206a35"
  },
  {
    "url": "assets/js/23.f7e0b911.js",
    "revision": "7777458bb920ed4b55c5b0a9028b451d"
  },
  {
    "url": "assets/js/3.7278a8fe.js",
    "revision": "049da3c2045a058a77a870a3ee16837c"
  },
  {
    "url": "assets/js/4.ee722d94.js",
    "revision": "9767a208ba47e03b1c4d1541f276c348"
  },
  {
    "url": "assets/js/5.ba262c7f.js",
    "revision": "490eee0145f9552a975db5a42b93e237"
  },
  {
    "url": "assets/js/6.75b452fb.js",
    "revision": "1e2eb3b9b7336c4fc260360461f84520"
  },
  {
    "url": "assets/js/7.f517106b.js",
    "revision": "ab449c2506a6acd3170792ec7918680f"
  },
  {
    "url": "assets/js/8.b72f7b82.js",
    "revision": "eb6beb3348fcccb2568642c0a073ca33"
  },
  {
    "url": "assets/js/9.cd9d09d1.js",
    "revision": "aee05446aa53fc7e00c8aa4752fc68da"
  },
  {
    "url": "assets/js/app.cf51ccb1.js",
    "revision": "ae8e27c39824b3f5db18fe0da9e9ef98"
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
    "url": "images/vue-next-vnode-to-dom.png",
    "revision": "b38b14f8bda9d2decb919fd7beee3d07"
  },
  {
    "url": "index.html",
    "revision": "695880f6e99e79f48021c1af9fb57f35"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "react/components/深入了解组件.html",
    "revision": "aa8996c58708b4c3caec345f30200847"
  },
  {
    "url": "react/getting-start/基础.html",
    "revision": "e89a3cab191ac758885ea19e91972722"
  },
  {
    "url": "react/hook/hook.html",
    "revision": "8ba349bad630bece2aa1bae97118943f"
  },
  {
    "url": "react/index.html",
    "revision": "080659b333b6dc75ac867e6361ea81ac"
  },
  {
    "url": "react/reactive/响应式.html",
    "revision": "c1700c8275b6be5ec2c9d7fae9fc0cad"
  },
  {
    "url": "react/redux/深入redux.html",
    "revision": "f45849f8ed2b2a565eb2686037c4246d"
  },
  {
    "url": "vue-next/core/diff.html",
    "revision": "5f0c99ab0461cc30eaf98372aed75b46"
  },
  {
    "url": "vue-next/core/vnode-to-dom.html",
    "revision": "944d70c6fb344f9b72d445a9e86e8621"
  },
  {
    "url": "vue-next/index.html",
    "revision": "fee4b49ea952332d13f3976021b3953a"
  },
  {
    "url": "vue/index.html",
    "revision": "1f7ba6883d820e5a6bcbd15b0044b632"
  },
  {
    "url": "vue/instance/index.html",
    "revision": "9b0d37875251e3a7150c7169cd935af8"
  },
  {
    "url": "vue/instance/newVue初始化.html",
    "revision": "d9143bbdf1c4f85e128b06869633d9a7"
  },
  {
    "url": "vue/instance/Vue是什么.html",
    "revision": "fcf6fc11d3ebef1275229673679a54b3"
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
