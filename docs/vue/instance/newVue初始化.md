# new Vue 初始化

回头看一下之前的例子，在这个例子中，`options` 里只传了两个参数 `el` 和 `data`，没有涉及 `watch`、`computed` 等等，接下来看看 Vue 在这个过程中是怎么实现的。

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

通过前面的了解，我们打开 Vue 构造函数的定义：

**src/core/instance/index.js**

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

可以看到到 `new Vue()` 之后，第一个执行的方法就是 `this._init(options)`，把我们的参数传给了这个方法，下面具体看看这个方法。

**core/instance/init.js**

```js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

接下来我们看看这个方法的主要作用。

## 1. 先在 `this` 对象上定义 2 个属性 `_uid` 和 `_isVue`；

```js
const vm: Component = this
vm._uid = uid++
vm._isVue = true
```

## 2. 使用合并策略合并选项

```js
if (options && options._isComponent) {
  // optimize internal component instantiation
  // since dynamic options merging is pretty slow, and none of the
  // internal component options needs special treatment.
  initInternalComponent(vm, options)
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
```

这里先判断有没有定义 `options._isComponent` 属性，这个属性是个内部属性，后面碰到再说。在这里我们的 `options` 里没有这个属性，所以会走到 `else` 部分。

可以看到 Vue 这里使用了 `mergeOptions()` 方法来处理我们传入的参数 `options`，然后将它赋值给 `vm.$options`，这里的 `vm` 就是 `this`。

`mergeOptions()` 方法有 3 个参数：

- `resolveConstructorOptions(vm.constructor)`：这是什么？
- `options || {}`：我们 `new Vue()` 时传入的参数对象
- `vm`：this

这里主要看一下 `resolveConstructorOptions()`，它定义如下：

**core/instance/init.js**

```js
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}
```

这个方法接收一个参数 `Ctor`，这里传入的是 `vm.constructor`，所以就是 `Vue` 函数本身。所以

```js
let options = Ctor.options
```

就相当于

```js
let options = Vue.options
```

还记得 Vue.options 吗？在前面找 Vue 的过程中，它的定义如下：

```js
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
```

然后判断 `Ctor.super` 是否存在，这个属性主要是用来处理继承的，在这里不存在，所以 `resolveConstructorOptions` 最后会返回 `Vue.options`。

再回到 `mergeOptions()`

**core/util/options.js**

```js
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

它的主要作用有：

- 先标准化 `Props`、`Inject` 和 `Directives`，都转成对象的格式
- 最后根据 key 调用同名的策略方法进行合并处理

在这里主要需要了解**合并策略 `strats`**，相关的定义都在当前文件中，我们看看

```js
/**
 * 定义合并策略函数，处理怎样合并 parent option 和
 * child option 成最后的 options
 */

// strats 是一个空对象，因为 optionMergeStrategies 等于 Object.create(null)
const strats = config.optionMergeStrategies 

// 在 strats 上定义各个同名属性的合并策略方法
strats.data = function() {}
// 定义生命钩子的合并策略为 mergeHook
// LIFECYCLE_HOOKS = ['beforeCreate','created','beforeMount','mounted', ...]
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
// 定义组件、指令、过滤器的合并策略为 mergeAssets
// ASSET_TYPES = ['component','directive','filter']
ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})
strats.watch = function() {}
strats.props =
strats.methods =
strats.inject =
strats.computed = function() {}

// 默认的合并方法，如果有 childVal 则返回 childVal，否则返回 parentVal
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}
```

在看看我们的例子，`el` 使用默认策略方法 `defaultStrat` 处理，而 `data` 使用的是 `strats.data` 方法，它最终会返回一个函数。

这里先不看每个合并策略的具体实现了，到这里我们知道 **`mergeOptions()` 就是 Vue 在合并 options 的时候，给每个属性都定定义一个合并策略方法，用来处理合并父子属性，并最终返回合并的结果对象**。这个返回值再赋值给 `vm.$options`，即 `this.$options`。

## 3. 进行初始化

```js
if (process.env.NODE_ENV !== 'production') {
  initProxy(vm)
} else {
  vm._renderProxy = vm
}
// expose real self
vm._self = vm
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

这里首先为实例添加两个属性，值都为自身：

```js
vm._renderProxy = vm
vm._self = vm
```

接下来调用 4 个 init 相关的方法：

- `initLifecycle(vm)`
- `initEvents(vm)`
- `initRender(vm)`
- `initInjections(vm)`
- `initState(vm)`
- `initProvide(vm)`

**在 `callHook(vm, 'beforeCreate')` 之后才 `initState(vm)`，这也就明白在 `beforeCreate` 的时候是不能访问 `data`、`computed`、`watch`、`methods` 的；然后在 `callHook(vm, 'created')` 之后才 `initRender(vm)`，所以在 `created` 时还未载到 DOM，不能访问到 `$el` 属性**。

根据执行的顺序，看看这 4 个方法，可以发现，这些方法是在处理 Vue 实例对象，以及做一些初始化的工作。到这里，看看这个过程添加的属性和方法有哪些：

```js
// Vue.prototype._init
this._uid = uid++
this._isVue = true
this.$options = {
    components,
    directives,
    filters,
    _base,
    el,
    data: mergedInstanceDataFn()
}
this._renderProxy = this
this._self = this

// initLifecycle(vm)
vm.$parent = parent
vm.$root = parent ? parent.$root : vm

vm.$children = []
vm.$refs = {}

vm._watcher = null
vm._inactive = null
vm._directInactive = false
vm._isMounted = false
vm._isDestroyed = false
vm._isBeingDestroyed = false

// initEvents(vm)
vm._events = Object.create(null)
vm._hasHookEvent

// initRender(vm)
vm._vnode = null // the root of the child tree
vm._staticTrees = null
vm.$slots = resolveSlots(options._renderChildren, renderContext)
vm.$scopedSlots = emptyObject
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

// initInjections(vm)

// initState(vm)
vm._watchers = []
vm._data

// initProvide(vm)
vm._provided = {}
```

上面就是一个 Vue 实例包含的属性和方法，这个过程中需要注意的是：

- `initEvents(vm)` 时，如果 `vm.$options._parentListeners`，还会执行 `updateComponentListeners(vm, listeners)`
- `initState(vm)` 时，主要执行了 5 个方法：
  - `initProps()`
  - `initMethods()`
  - `initData()`
  - `initComputed()`
  - `initWatch()`

## 4. 最后进行挂载

```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```

如果有 `vm.$options.el` 则调用 `vm.$mount(vm.$options.el)` 进行挂载。这也就是如果我们的参数没有 `el`，那么需要手动挂载的原因。

## 总结

在 new Vue() 之后，执行的就是 this._init(options) 进行初始化，它最主要的作用：

- 使用选项合并策略进行合并，并将结果放回给 `vm.$options`
- 初始化 Vue 实例上的属性和方法。

初始化属性方法过程中，方法的执行顺序，我们展开如下：

```js
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm)
// initState(vm)
initProps()
initMethods()
initData()
initComputed()
initWatch()
initProvide(vm)
callHook(vm, 'created')
```

最后会判断是否有 `el` 属性，在我们的例子中，有 `el` 属性，所以会执行 `vm.$mount(vm.$options.el)`。
