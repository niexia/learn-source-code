# Vue 是什么

前面的例子中，使用 `new` 操作符来调用 `Vue`，也就是说 `Vue` 应该是一个构造函数。所以现在就先找到它。

那怎么找到它？

## 从 scripts 开始

在看源码之前，第一个想到的应该是 package.json 文件，这里面包含了这个代码仓库关键的信息。可以看 scripts 部分包含的指令，就类似一般工作项目中的 `npm run dev` 或者 `npm run build` 一样，可以了解源码是如何开始运行的。这里看一下 `npm run dev`

```sh
"dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
```

可以看到 Vue 是使用 roolup 来进行打包的。`-w` 就是 watch，`-c` 就是指定配置文件为 `scripts/config.js`，最后将 `TARGET` 得值设置为 `web-full-dev`。打开 `build/config.js` 看看：

**build/config.js**

```js
// 引入依赖，定义 banner，alias
// ...

// build 配置对象
const builds = {
  //...
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // runtime-only production build (Browser)
  'web-runtime-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // ...
}

// 生成配置的方法
function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
  // ...
  return config
}

// 判断构建的目标并生成配置文件
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
```

执行 `npm run dev` 的时候，将 `TARGET` 设置为 `web-full-dev`，所以会执行

```js
module.exports = genConfig(process.env.TARGET)
```

相当于

```js
module.exports = genConfig({
  entry: resolve('web/entry-runtime-with-compiler.js'),
  dest: resolve('dist/vue.js'),
  format: 'umd',
  env: 'development',
  alias: { he: './entity-decoder' },
  banner
})
```

最终 `genConfig` 会返回一个 `config` 对象，这个 `config` 对象就是 roolup 的配置对象。可以看到入口文件就是 `entry` 指向的 `web/entry-runtime-with-compiler.js`。

## 入口文件

打开入口文件：

**web/entry-runtime-with-compiler.js**

```js
import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)
  // ...
}
```

可以看到，下面这行代码，现在主要是找 “Vue”！其他的先暂时跳过，所以接下来去看 `./runtime/index`。

```js
import Vue from './runtime/index'
```

**web/runtime/index.js**

```js
/* @flow */

import Vue from 'core/index'

// ...

export default Vue
```

依照上面的思路，接着打开 `core/index`

**core/index.js**

```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)
// ...
```

依可以知道 Vue 构造函数应该在 `src/core/instance/index.js` 文件中，所以整个找 Vue 构造函数的过程是这样的：

1. `npm run dev` 确定入口文件 web/entry-runtime-with-compiler.js 
2. 找到入口文件并发现是在 web/runtime/index.js 
3. 打开 web/runtime/index.js 发现其实是在 core/index.js
4. 最后找到了 instance/index.js

接下来，我们再从后往回看！每一步都做了什么。

### 1. 构造函数的定义和挂载原型方法

**instance/index.js**

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  // 校验必须使用 new 操作符来调用函数
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

在这里面引入相关依赖，然后定义了构造函数 Vue，然后以 Vue 为参数调用了 5 个方法。打开这些方法对应的文件，看看主要是做什么用的。

- **`initMixin`**

**instance/init.js**

```js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    // ...
  }
}
```

- **`stateMixin`**

**instance/state.js**

```js
export function stateMixin (Vue: Class<Component>) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  // ...
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    // ...
  }
```

- **`eventsMixin`**

**instance/events.js**

```js
export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    // ...
  }
  Vue.prototype.$once = function (event: string, fn: Function): Component {
    // ...
  }
  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    // ...
  }
  Vue.prototype.$emit = function (event: string): Component {
    // ...
  }
}
```

- **`lifecycleMixin`**

**instance/lefecycle.js**

```js
export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    // ...
  }
  Vue.prototype.$forceUpdate = function () {
    // ...
  }
  Vue.prototype.$destroy = function () {
    // ...
  }
}
```

- **`renderMixin`**

**instance/render.js**

```js
export function renderMixin (Vue: Class<Component>) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }

  Vue.prototype._render = function (): VNode {
    // ...
  }
}
```

**可以法相，这些方法的作用，就是在 Vue 的圆形 `prototype` 上挂载方法和属性，经过这 5 个方法之后，Vue 的 `prototype` 变成了这样：**

```js
// initMixin(Vue)
Vue.prototype._init = function (options?: Object) {}

// stateMixin(Vue)
Vue.prototype.$data
Vue.prototype.$props
Vue.prototype.$set = set
Vue.prototype.$delete = del
Vue.prototype.$watch = function(){}

// eventsMixin(Vue) 
Vue.prototype.$on = function (event: string, fn: Function): Component {}
Vue.prototype.$once = function (event: string, fn: Function): Component {}
Vue.prototype.$off = function (event?: string, fn?: Function): Component {}
Vue.prototype.$emit = function (event: string): Component {}

// lifecycleMixin(Vue)
// Vue.prototype._mount = function(){}
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {}
// Vue.prototype._updateFromParent = function(){}
Vue.prototype.$forceUpdate = function () {}
Vue.prototype.$destroy = function () {}

// renderMixin(Vue)
Vue.prototype.$nextTick = function (fn: Function) {}
Vue.prototype._render = function (): VNode {}
// Vue.prototype._s = _toString
// Vue.prototype._v = createTextVNode
// Vue.prototype._n = toNumber
// Vue.prototype._e = createEmptyVNode
// Vue.prototype._q = looseEqual
// Vue.prototype._i = looseIndexOf
// Vue.prototype._m = function(){}
// Vue.prototype._o = function(){}
// Vue.prototype._f = function resolveFilter (id) {}
// Vue.prototype._l = function(){}
// Vue.prototype._t = function(){}
// Vue.prototype._b = function(){}
// Vue.prototype._k = function(){}
```

### 2. 在 Vue 构造函数上挂载静态属性和方法

**core/index.js**

```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```

这个方法也比较简单，导入已经挂载在圆形上挂载了方法和属性后的 Vue，然后执行 `initGlobalAPI(Vue)`，然后在 Vue.prototype 上挂载了 `$isServer` 和 `$ssrContext`，最后在 Vue 上挂载了 `version` 属性。

这里主要看看 `initGlobalAPI` 的内容

**core/global-api/index.js**

```js
/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```

**可以看到 `initGlobalAPI` 的作用是在 Vue 构造函数上挂载静态属性和方法。经过这部分之后，Vue 就会变成下面这个样子：**

```js
// src/core/index.js 
// src/core/global-api/index.js
Vue.config
Vue.util = util
Vue.set = set
Vue.delete = del
Vue.nextTick = util.nextTick
Vue.options = {
  components: {
    KeepAlive
  },
  directives: {},
  filters: {},
  _base: Vue
}
Vue.use
Vue.mixin
Vue.cid = 0
Vue.extend
Vue.component = function(){}
Vue.directive = function(){}
Vue.filter = function(){}

Vue.prototype.$isServer
Vue.prototype.$ssrContext
Vue.version = '__VERSION__'
```

下一个就是 `web/runtime/index.js`。

### 3. 安装平台平台相关的指令、组件并定义 $mount

```js
/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// ...

export default Vue
```

**这里主要就做 3 件事**：

- 覆盖 `Vue.config`，安装平台特有的一些方法
- 在 `Vue.options.directives` 和 `Vue.options.components` 上安装平台特有的指令和组件
- 在 `Vue.prototype` 上定义 `__patch__` 和 `$mount`

**经过这一步之后 Vue 就变成下面这个样子：**

```js
// 安装平台特定的 utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement
// 安装平台特定的指令和组件
Vue.options = {
  components: {
    KeepAlive,
    Transition,
    TransitionGroup
  },
  directives: {
    model,
    show
  },
  filters: {},
  _base: Vue
}
Vue.prototype.__patch__
Vue.prototype.$mount
```

注意的是 Vue.options 的变化，另外 `$mount` 方法很简单

```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

首先判断如果 `el` 存在，而且是浏览器环境则 `query(el)` 获取元素，然后将 `el` 传给 `mountComponent(this, el, hydrating)`。

最后就是入口文件了

### 4. 缓存原来的 $mount，编译生成 render 函数

**web/entry-runtime-with-compiler.js**

```js
/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
```

这里主要做 2 件事

1.  缓存 `$mount` 函数，然后覆盖 `Vue.prototype.$mount`

这里的 `$mount` 比较有意思，它的主要作用有

- 对 `el` 做限制，Vue 不能挂载在 `body`、`html` 这样的根结点。
- 如果没有定义 `render` 方法，则会把 `template` 或者 `el` 转换成 `render` 函数，它是调用 `compileToFunctions` 方法实现的

**在 Vue 2.x 中，所有组件的渲染都需要 `render` 方法，无论用的是单文件 `.vue` 的方式，还是写了 `el` 或者 `template` 属性，最终都会转换成 `render` 方法。可以打开你项目中打包之后的 js 文件，每个组件里面都可以找到一个 `render` 方法。**

再看看这个入口文件的名称 `entry-runtime-with-compiler.js`，如果你开始时注意 `build/config.js`，其实还有其他配置，**也就是 Vue 会分不同版本：runtime-only 和 runtime-compiler**。

```js
// runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // ...
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
```

对比一下：

- runtime-only

项目开发中，一般都是使用 Runtime Only 版本的 Vue.js，这时，通常需要借助如 webpack 的 vue-loader 工具把 `.vue` 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。

- runtime+compiler

如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板。因为 Vue 的最终渲染是通过 render 函数的。

```js
// 需要编译器的版本
new Vue({
  template: '<div>{{ hi }}</div>'
})
// 不需要
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```

很显然这个编译过程是有一定性能损耗的，所以更推荐使用 runtime-only 的版本。

2. 在 Vue 上挂载了 `compile` 

## 总结

至此还原了 Vue 构造函数，总结一下：

1. Vue.prototype 下的属性和方法的挂载主要是在 `src/core/instance` 目录中的代码处理的。
2. Vue 下的静态属性和方法的挂载主要是在 `src/core/global-api` 目录下的代码处理的。
3. `web/runtime/index.js` 主要是添加 web 平台特有的配置、组件和指令。
4. `web/web-runtime-with-compiler.js` 给Vue的 $mount 方法添加 compiler 编译器，支持 template。

