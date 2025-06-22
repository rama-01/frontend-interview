1. 路由懒加载
2. keep-alive缓存页面
3. 使用v-show复用DOM

```vue
<template>
  <div class="cell">
    <!--这种情况⽤v-show复⽤DOM，⽐v-if效果好-->
    <div v-show="value" class="on">
    <Heavy :n="10000"/> 
    </div>
    <section v-show="!value" class="off">
    <Heavy :n="10000"/>
    </section>
  </div>
</template>
```

4. v-for遍历避免同时v-if
5. 长列表性能优化

```js
// 如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应化
export default {
data: () => ({
users: []
}),
async created() {
const users = await axios.get("/api/users");
this.users = Object.freeze(users);  //使用Object.freeze()避免响应式处理
}
};
//或者采用虚拟滚动，只渲染少部分区域
```

6. 事件销毁

Vue 组件销毁时，会⾃动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。此时就需要在beforeDestroy中手动销毁。

7. 图片懒加载 v-lazy
8. 第三方插件按需引入
9. 无状态组件标记为函数式组件

```vue
<template functional>
<div class="cell">
<div v-if="props.value" class="on"></div>
<section v-else class="off"></section>
</div>
</template>
```

无状态组件：在Vue中，无状态组件也称为函数式组件，是指没有状态管理、不监听传递给它的状态、没有生命周期方法、只能接收一些prop数据、本身没有实例（即没有this）的组件。这种组件通常用于简单展示性内容，不需要保留状态的场景，以提高渲染性能为主要目的。

10. SSR
