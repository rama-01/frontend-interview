1. 懒加载
```html
<div class="container">
<img src="loading.gif" data-src="pic.png">
<img src="loading.gif" data-src="pic.png">
<img src="loading.gif" data-src="pic.png">
<img src="loading.gif" data-src="pic.png">
<img src="loading.gif" data-src="pic.png">
<img src="loading.gif" data-src="pic.png">
</div>
<script>
var imgs = document.querySelectorAll('img');
function lazyLoad() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var winHeight = window.innerHeight;
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].offsetTop < scrollTop + winHeight) {
            imgs[i].src = imgs[i].getAttribute('data-src');
        }
    }
}
window.onscroll = lazyLoad();
</script>
```

2. 图片优化
3. webpack优化
4. 