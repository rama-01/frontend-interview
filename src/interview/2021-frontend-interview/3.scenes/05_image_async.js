const imageAsync = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            console.log('image loaded');
            resolve()
        }
        image.onerror = () => {
            console.log('image error');1
            reject();
        }
    })

imageAsync('url').then(() => 'image loaded').catch(() => 'image error')
