// CustomModal.js
import React, { useState, useImperativeHandle, forwardRef } from 'react'

const CustomModal = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        open: () => setIsVisible(true),
        close: () => setIsVisible(false),
    }))

    if (!isVisible) return null

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <p>这是一个自定义弹窗</p>
                <button onClick={() => setIsVisible(false)}>关闭</button>
            </div>
        </div>
    )
})

export default CustomModal
