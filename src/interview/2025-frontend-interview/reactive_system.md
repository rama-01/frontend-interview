# Vue响应式系统原理与实现：从数据劫持到视图更新

Vue的响应式系统是其核心特性之一，它通过数据劫持和依赖追踪实现了数据与视图的自动同步。下面我将从源码层面详细解析这一过程，包括Vue 2.x的Object.defineProperty实现和Vue 3.x的Proxy实现。

## 一、Vue 2.x的响应式系统实现

### 1. 数据劫持与getter/setter转换

Vue 2.x使用Object.defineProperty()来实现数据劫持。当创建Vue实例时，Vue会遍历data对象的所有属性，将它们转换为getter/setter：

```js
// src/core/observer/index.js
function defineReactive(obj, key, val) {
  const dep = new Dep(); // 每个属性都对应一个Dep实例
  
  // 递归处理嵌套对象
  if (typeof val === 'object' && val !== null) {
    observe(val);
  }
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      if (Dep.target) {
        dep.depend(); // 依赖收集
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 新值是对象时也进行观察
      if (typeof newVal === 'object' && newVal !== null) {
        observe(newVal);
      }
      dep.notify(); // 通知所有Watcher更新
    }
  });
}

function observe(value) {
  if (typeof value !== 'object' || value === null) {
    return;
  }
  // 已经是响应式对象则直接返回
  if (value.__ob__ instanceof Observer) {
    return value.__ob__;
  }
  return new Observer(value);
}

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      // 处理数组的特殊情况
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
  
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}
```

这段代码展示了Vue如何通过递归遍历data对象，为每个属性设置getter和setter。

### 2. 依赖收集与Watcher机制

每个组件实例都有一个对应的Watcher实例，它在组件渲染过程中收集依赖：

```js
// src/core/observer/watcher.js
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.cb = cb;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
  
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
  
    this.value = this.get(); // 首次执行getter，触发依赖收集
  }
  
  get() {
    pushTarget(this); // 设置当前Watcher为Dep.target
    let value;
    const vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      // 错误处理
    } finally {
      popTarget(); // 恢复之前的Watcher
      this.cleanupDeps(); // 清理旧依赖
    }
    return value;
  }
  
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this); // 将Watcher添加到Dep的订阅列表中
      }
    }
  }
  
  update() {
    queueWatcher(this); // 将Watcher推入队列，异步更新
  }
  
  run() {
    const value = this.get();
    if (value !== this.value || isObject(value)) {
      const oldValue = this.value;
      this.value = value;
      this.cb.call(this.vm, value, oldValue); // 执行回调
    }
  }
}
```

Watcher在初始化时会执行get()方法，触发getter，从而将自身添加到属性的依赖列表中。

### 3. Dep类与依赖管理

Dep类负责管理依赖关系，每个响应式属性都有一个对应的Dep实例：

```js
// src/core/observer/dep.js
let uid = 0;

class Dep {
  constructor() {
    this.id = uid++;
    this.subs = []; // 存储Watcher实例
  }
  
  addSub(sub) {
    this.subs.push(sub);
  }
  
  removeSub(sub) {
    remove(this.subs, sub);
  }
  
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this); // 当前Watcher添加此Dep
    }
  }
  
  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update(); // 通知所有Watcher更新
    }
  }
}

Dep.target = null; // 当前正在计算的Watcher
const targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
```

当属性被修改时，setter会触发dep.notify()，通知所有依赖的Watcher进行更新。

## 二、Vue 3.x的响应式系统实现

Vue 3.x使用Proxy替代了Object.defineProperty，解决了Vue 2.x中的一些限制：

### 1. 基于Proxy的响应式实现

```js
// Vue 3.x的响应式实现
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      track(target, key); // 依赖收集
      const result = Reflect.get(target, key, receiver);
      if (isObject(result)) {
        return reactive(result); // 嵌套对象也转为响应式
      }
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        trigger(target, key); // 触发更新
      }
      return result;
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hadKey) {
        trigger(target, key); // 删除属性时也触发更新
      }
      return result;
    }
  };
  
  return new Proxy(target, handler);
}

// 依赖收集
function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}

// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const effects = new Set();
  depsMap.get(key).forEach(effect => {
    effects.add(effect);
  });
  effects.forEach(effect => effect());
}
```

Proxy可以拦截更多操作，包括属性添加、删除等，解决了Vue 2.x无法检测新增属性的问题。

### 2. 副作用函数与响应式更新

Vue 3.x使用副作用函数(effect)替代Watcher：

```js
let activeEffect;

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
  };
  effectFn.deps = [];
  effectFn();
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const dep = effectFn.deps[i];
    dep.delete(effectFn);
  }
  effectFn.deps.length = 0;
}
```

## 三、完整流程示例

### 1. Vue实例初始化

```js
// 用户代码
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});

// Vue构造函数
function Vue(options) {
  this._init(options);
}

// 初始化方法
Vue.prototype._init = function(options) {
  const vm = this;
  vm.$options = options;
  initState(vm);
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};

// 初始化状态
function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}

// 初始化数据
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  // 代理_data到实例上
  for (const key in data) {
    proxy(vm, '_data', key);
  }
  // 观察数据
  observe(data);
}
```

### 2. 组件更新流程

1. **初始化阶段**：
   * 创建Vue实例，初始化数据
   * 对data对象进行响应式处理
   * 创建渲染Watcher，首次执行渲染函数
2. **依赖收集阶段**：
   * 渲染函数执行过程中访问响应式数据
   * 触发getter，将当前Watcher添加到Dep中
3. **更新阶段**：
   * 数据被修改，触发setter
   * Dep通知所有Watcher更新
   * Watcher将自身推入队列，异步执行更新
   * 最终重新渲染组件

## 四、Vue 2.x与Vue 3.x响应式系统对比

| 特性              | Vue 2.x (Object.defineProperty)  | Vue 3.x (Proxy)    |
| ----------------- | -------------------------------- | ------------------ |
| 检测属性添加/删除 | 不支持，需使用Vue.set/Vue.delete | 原生支持           |
| 数组变化检测      | 需要重写数组方法                 | 原生支持           |
| 性能              | 递归遍历对象属性，性能较差       | 惰性访问，性能更好 |
| 嵌套对象处理      | 初始化时递归处理                 | 访问时按需处理     |
| 代码复杂度        | 实现复杂                         | 实现简洁           |
| 浏览器兼容性      | 支持IE9+                         | 不支持IE           |

Vue 3.x的Proxy实现解决了Vue 2.x的多个痛点，提供了更完善的响应式能力和更好的性能。

通过以上源码分析，我们可以看到Vue响应式系统的精妙设计：通过数据劫持追踪依赖，通过发布-订阅模式实现数据变化时的自动更新。这种机制使得开发者可以专注于数据逻辑，而无需手动操作DOM，大大提高了开发效率。
