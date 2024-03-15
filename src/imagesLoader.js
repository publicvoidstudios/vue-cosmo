// Создаем файл, который будет импортировать все изображения из директории
const images = {};
const requireImages = require.context('@/resources', true, /\.(png|jpe?g|svg)$/);
requireImages.keys().forEach((filename) => {
    const image = requireImages(filename);
    const imageName = filename.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
    images[imageName] = image;
});

export default images;