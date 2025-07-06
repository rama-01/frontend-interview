// copy.ts
import type {App, DirectiveBinding} from 'vue'

const CopyPlugin = {
    install(app: App<Element>, options: Record<string, any>) {
        app.directive('copy', {
            mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
                const text = binding.value

                el.addEventListener('click', async () => {
                    try {
                        await navigator.clipboard.writeText(text)
                        if (options?.onCopy) {
                            options.onCopy(true, text)
                        }
                    } catch (err) {
                        if (options?.onCopy) {
                            options.onCopy(false, text)
                        }
                    }
                })
            },

            updated(el: HTMLElement, binding: DirectiveBinding<string>) {
                el.dataset.text = binding.value
            }
        })

        app.config.globalProperties.$copy = () => console.log('copy completed')
    }
}

export default CopyPlugin
