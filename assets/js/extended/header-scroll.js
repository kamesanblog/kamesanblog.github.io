(function() {
    var lastScrollTop = 0;
    var header = document.querySelector('.header');
    if (!header) return; // 確保抓得到元素

    window.addEventListener("scroll", function() {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        
        // 1. 向下捲動超過 60px 且比上次位置深 -> 隱藏
        if (st > lastScrollTop && st > 60) {
            header.classList.add('header-hidden');
        } 
        // 2. 向上捲動 -> 顯示
        else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = st <= 0 ? 0 : st; 
    }, { passive: true }); // 增加效能參數
})();