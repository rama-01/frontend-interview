//bLoading.js
import type {App} from 'vue'

let tag = null

const className = `  //loading图标的样式
    el-icon {
      --color: inherit;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      height: 1em;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      line-height: 1em;
      position: relative;
      width: 1em;
      fill: currentColor;
      color: var(--color);
      font-size: inherit;
    }
`

//loading图标，可以去阿里图库上面复制一个svg
const i = `<i class=${className} id='loading'> 
    <svg t="1745215287730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2663" width="200" height="200"><path d="M834.7648 736.3584a5.632 5.632 0 1 0 11.264 0 5.632 5.632 0 0 0-11.264 0z m-124.16 128.1024a11.1616 11.1616 0 1 0 22.3744 0 11.1616 11.1616 0 0 0-22.3744 0z m-167.3216 65.8944a16.7936 16.7936 0 1 0 33.6384 0 16.7936 16.7936 0 0 0-33.6384 0zM363.1616 921.6a22.3744 22.3744 0 1 0 44.7488 0 22.3744 22.3744 0 0 0-44.7488 0z m-159.744-82.0224a28.0064 28.0064 0 1 0 55.9616 0 28.0064 28.0064 0 0 0-56.0128 0zM92.672 700.16a33.6384 33.6384 0 1 0 67.2256 0 33.6384 33.6384 0 0 0-67.2256 0zM51.2 528.9984a39.168 39.168 0 1 0 78.336 0 39.168 39.168 0 0 0-78.336 0z m34.1504-170.0864a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 0 0-89.6 0zM187.904 221.7984a50.432 50.432 0 1 0 100.864 0 50.432 50.432 0 0 0-100.864 0zM338.432 143.36a55.9616 55.9616 0 1 0 111.9232 0 55.9616 55.9616 0 0 0-111.9744 0z m169.0112-4.9152a61.5936 61.5936 0 1 0 123.2384 0 61.5936 61.5936 0 0 0-123.2384 0z m154.7776 69.632a67.1744 67.1744 0 1 0 134.3488 0 67.1744 67.1744 0 0 0-134.3488 0z m110.0288 130.816a72.8064 72.8064 0 1 0 145.5616 0 72.8064 72.8064 0 0 0-145.5616 0z m43.7248 169.472a78.3872 78.3872 0 1 0 156.8256 0 78.3872 78.3872 0 0 0-156.8256 0z" fill="" p-id="2664"></path></svg>
    </i>`

//核心代码
export function bLoading(app: App<Element>) {
    app.directive('bLoading', (el, binding) => {
        if (typeof binding.value !== 'function') {
            throw new Error('Directive value must be a function')
        }
        el.addEventListener('click', () => {
            addNode(el) //添加loading图标
            setTimeout(() => {
                //执行异步函数
                binding.value(() => {
                    cleanNode(el) //清除loading
                })
            }) //延迟执行异步函数
        })
    })
}

//新增loading图标
function addNode(el) {
    if (el.firstElementChild.tagName === 'I') {
        //如果按钮上面自带图标，就先移除
        tag = el.firstElementChild
        el.removeChild(el.firstElementChild)
        el.insertAdjacentHTML('afterbegin', i)
    } else {
        el.insertAdjacentHTML('afterbegin', i)
    }
    el.setAttribute('disabled', true)
    rotate('loading')
}

//清除loading图标
function cleanNode(el) {
    el.removeAttribute('disabled')
    if (el.firstElementChild) {
        el.removeChild(el.firstElementChild)
        if (tag) {
            el.prepend(tag)
        }
    }
}

//图标旋转动画
function rotate(id) {
    const element = document.getElementById(id)
    let angle = 0 // 初始角度为0度
    const speed = 2 // 旋转速度，单位为度/帧（例如，每帧旋转2度）
    function rotate() {
        angle = (angle + speed) % 360 // 确保角度在0到360之间循环
        element.style.transform = `rotate(${angle}deg)` // 应用旋转变换
        requestAnimationFrame(rotate) // 请求下一帧的动画回调
    }
    rotate() // 开始动画循环
}
