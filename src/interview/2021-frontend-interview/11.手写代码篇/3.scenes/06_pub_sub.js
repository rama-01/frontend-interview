class EventCenter {
    // handlers = {}
    constructor() {
        this.handlers = {}
    }
    // 1. 添加事件方法
    addEventListener(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    }

    // 2. 触发事件
    dispatchEvent(type, params) {
        if (!this.handlers[type]) {
            throw new Error('事件未注册')
        }
        this.handlers[type].forEach(handler => handler(...params))
    }

    // 3.移除事件,若无第二个参数，则删除该事件的订阅和发布
    removeEventListener(type, handler) {
        if (!this.handlers[type]) {
            throw new Error('事件无效')
        }
        if (!handler) {
            delete this.handlers[type]
        } else {
            const index = this.handlers.findIndex(item => item === handler)
            if (index === -1) {
                throw new Error('未绑定该事件')
            }
            this.handlers[type].splice(index, 1)
            // 删除之后检查事件方法数组，如果为空，删除事件名
            if (!this.handlers[type].length) {
                delete this.handlers[type]
            }
        }
    }
}