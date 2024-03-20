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