let count = 1;
const totalSlides = document.querySelectorAll('.slide').length;

setInterval( () => {
    nextImage();
}, 5000);

function nextImage() {
    count++;
    if(count > 4){
        count = 1;
    }
    
    document.getElementById("radio" + count).checked = true; 
}

function nextSlide() {
    count++;
    if (count > totalSlides) {
        count = 1;
    }
    document.getElementById('radio' + count).checked = true;
}

function prevSlide() {
    count--;
    if (count < 1) {
        count = totalSlides;
    }
    document.getElementById('radio' + count).checked = true;
}