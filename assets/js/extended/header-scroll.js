(function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    if (!header) {
        console.error("找不到 .header 元素，請檢查主題 HTML 結構。");
        return;
    }

    console.log("Header 隱藏腳本已成功載入！");

    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st > lastScrollTop && st > 100) {
            // 向下捲動 -> 隱藏
            header.classList.add('header-hidden');
        } else {
            // 向上捲動 -> 顯示
            header.classList.remove('header-hidden');
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, { passive: true });
})();