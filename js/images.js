images = document.querySelectorAll('img');

const mouseE = (evt) => {
    thisimage = evt.target.getAttribute('src');
    newimage = thisimage.replace('thumbnail', 'bw')
    evt.target.setAttribute('src', newimage)
}

const mouseL = (evt) => {
    evt.target.setAttribute('src', thisimage)
}

images.forEach((item) => {
    item.addEventListener('mouseenter', mouseE);
    item.addEventListener('mouseleave', mouseL)
})

lightGallery(document.querySelector('#gallery'), {
    plugins: [lgZoom, lgThumbnail, lgFullscreen],
    thumbWidth: 80,
    controls: true,
    getCaptionFromTitleOrAlt: true,
    loop : true,
    actualSize: false,
    counter: true,
    fullScreen: true,
    zoom: true,
    mode: 'lg-fade'
});