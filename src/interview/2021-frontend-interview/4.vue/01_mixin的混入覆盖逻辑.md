在Vue2中，混入（mixin）的覆盖逻辑可以通过以下示例说明：

假设有一个名为`name.js`的mixin文件，其中定义了`data`、`methods`和`mounted`等选项：
```javascript
export default {
  data () {
    return {
      name: 'mixin的name',
      obj: { name: 'mixin', value: 'mixin' }
    }
  },
  methods: {
    getName() {
      console.log('我是mixin,name:', this.name);
      console.log('obj:', this.obj);
    },
    mounted() {
      console.log('我是mixin的mounted');
      this.getName();
    }
  }
}
```

然后，在组件中引入这个mixin，并且在组件内部也定义了相同的数据和方法：
```javascript
import name from './name.js'

export default {
  mixins: [name],
  data () {
    return {
      name: '组件的name',
      obj: { name: 'component' }
    },
    methods: {
      getName() {
        console.log('我是组件,name:', this.name);
        console.log('obj:', this.obj);
      },
      mounted() {
        console.log('我是组件的mounted');
        this.getName();
      }
    }
  }
}
```

根据Vue2中混入的覆盖逻辑：
- 钩子函数会合并执行，先执行mixin的钩子函数再执行组件的钩子函数。
- 对于`data`中的同名数据，基本类型会被组件数据覆盖，对象会递归对比key，同名key会被覆盖。
- 对于`methods`中的同名方法，会用组件的方法覆盖mixin的同名方法。

因此，在上述示例中，钩子函数会合并执行，数据中基本类型会被组件数据覆盖，对象会保留组件数据，而方法则会用组件的方法覆盖mixin的方法[1][2][5].

Citations:
[1] https://blog.csdn.net/Teemo_shape/article/details/124838891
[2] https://juejin.cn/post/7033424132427481101
[3] https://blog.csdn.net/jieyucx/article/details/131631082
[4] https://juejin.cn/post/7282744150842458167
[5] https://www.cnblogs.com/zychuan/p/17029666.html