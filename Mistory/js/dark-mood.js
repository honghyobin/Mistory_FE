document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    console.log('Dark mode setting on load:', localStorage.getItem('darkMode')); // 로컬 스토리지 값 확인
    
    const currentMode = localStorage.getItem('darkMode');
    if (currentMode === 'enabled') {
        document.body.classList.add('dark-mode');
    } else if (currentMode === 'disabled') {
        document.body.classList.remove('dark-mode');
    }

    toggleDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
        console.log('Dark mode setting after toggle:', localStorage.getItem('darkMode')); // 토글 후 로컬 스토리지 값 확인
        console.log('Body class list:', document.body.classList); // 클래스 목록 확인
    });
});