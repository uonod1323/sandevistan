const img = document.getElementById('draggableImage');

let isDragging = false;
let offsetX, offsetY;
let hueRotation = 0;  // Initial value for hue rotation
img.style.zIndex = '1';

img.addEventListener('mouseover', (e) => {
    isDragging = true;
    offsetX = e.clientX - img.getBoundingClientRect().left;
    offsetY = e.clientY - img.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        // Create afterimage
        createAfterImage(e.clientX - offsetX, e.clientY - offsetY);

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        img.style.left = x + 'px';
        img.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

function createAfterImage(x, y) {
    const afterImage = img.cloneNode();
    
    afterImage.style.opacity = 1.0;
    afterImage.style.pointerEvents = 'none'; // ensure it doesn't interfere with other mouse events
    afterImage.style.transition = 'opacity 3.0s'; // fading effect
    afterImage.style.position = 'absolute';  // ensure positioning works

    // Set a lower z-index for the afterimage so it's below the original
    afterImage.style.zIndex = '0';
    
    // Apply hue rotation ONLY to the afterimage
    afterImage.style.filter = `hue-rotate(${hueRotation}deg)`;
    hueRotation = (hueRotation + 15) % 360;  // Increment by 15 degrees; wrap around at 360

    document.body.appendChild(afterImage);

    afterImage.style.left = x + 'px';
    afterImage.style.top = y + 'px';

    // Fade out the afterimage
    setTimeout(() => {
        afterImage.style.opacity = 0;
    }, 10);

    // Remove the afterimage from the DOM after it has fully faded
    setTimeout(() => {
        document.body.removeChild(afterImage);
    }, 510);
}