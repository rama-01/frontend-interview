### 1. vue基本原理
当vue实例创建时，vue会遍历data中所有的属性，使用Object.defineProperty将它们转换为getter，setter，并在内部追踪相关的依赖，在属性被修改时通知变化。每个组件实例都有响应的watcher，它会组件渲染过程中把属性记录为相关依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。
```
                            notify
--> Data(getter,setter) ----------->> Watcher -------> component render function --> Virtual DOM Tree
Object.defineProperty  collect dependency     trigger re-render                  render
```

### 2. 双向数据绑定的原理
```
                notify          notify             update
    Observer -----------> Dep <--------->  Watcher ----------> View
劫持并监听所有属性                添加订阅者     |                |
                                              | 绑定更新函数     |
                                              |                 |
                                            Compile -------------
                                                        初始化                                              
```

### 3. MV*(MVVM,MVC,MVP)
