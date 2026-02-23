window.onscroll = function() {
    var header = document.querySelector('.header');
    if (window.pageYOffset > 100) {
        header.style.transition = "transform 0.3s";
        header.style.transform = "translateY(-100%)";
    } else {
        header.style.transform = "translateY(0)";
    }
};