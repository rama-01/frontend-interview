### 1. BFC
1. 释义：   
块级格式化上下文， 是⼀个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

2. 触发条件     
- 根元素
- position: absolute/fixed
- display: inline-block / table
- float 元素
- overflow !== visible

3. 规则     
- 属于同一个BFC的两个相邻box垂直排列
- 属于同一个BFC的两个相邻box的margin会发生重叠
- BFC中margin box的左边，与包含块border box的左边想接触  ？
- BFC区域不会与float的元素区域重叠
- 计算BFC高度时，浮动子元素也参与计算
- 文字层不会被浮动层覆盖，环绕于周围

### 2. 