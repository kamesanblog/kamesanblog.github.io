document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.post-content img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.85); z-index: 9999;
                display: flex; align-items: center; justify-content: center;
                cursor: zoom-out; opacity: 0; transition: opacity 0.3s ease;
            `;
            
            const fullImg = document.createElement('img');
            fullImg.src = img.src;
            fullImg.style = 'max-width: 90%; max-height: 90%; border-radius: 4px; box-shadow: 0 0 20px rgba(0,0,0,0.5);';
            
            overlay.appendChild(fullImg);
            document.body.appendChild(overlay);
            
            // 觸發漸顯效果
            setTimeout(() => overlay.style.opacity = '1', 10);
            
            // 點擊背景關閉
            overlay.onclick = () => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            };
        });
    });
});