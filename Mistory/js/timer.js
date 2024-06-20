function closeOverlay() {
    var nicknameInput = document.querySelector('.nickname');
    if (nicknameInput.value.trim() === '') {
        alert('닉네임을 입력해주세요!');
        return; // 함수 실행 중단
    }

    var nickname = nicknameInput.value;
    console.log(nickname);

    // 닉네임을 localStorage에 저장
    localStorage.setItem('nickname', nickname);

    // 오버레이 상태를 localStorage에 저장
    localStorage.setItem('overlayClosed', 'true');

    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    startTimer();
}

function startTimer() {
    const duration = 5 * 60 * 1000; // 5분을 밀리초로 환산
    const now = new Date().getTime();
    const endTime = now + duration;

    localStorage.setItem('timerEndTime', endTime);

    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date().getTime();
    const endTime = localStorage.getItem('timerEndTime');
    const distance = endTime - now;

    if (distance <= 0) {
        document.getElementById('timer').textContent = "00:00";
        localStorage.removeItem('timerEndTime');
        localStorage.removeItem('nickname');
        localStorage.removeItem('overlayClosed'); // 오버레이 상태 초기화
        location.href = 'guestBook.html';
        
    } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

window.onload = function () {

    // 타이머가 실행 중이면 타이머를 업데이트
    if (localStorage.getItem('timerEndTime')) {
        updateTimer();
        setInterval(updateTimer, 1000);
    }
};

function goGuestBook() {
    var userResponse = confirm("탈출을 포기하고 방명록을 작성하시겠습니까?");
    if (userResponse) {
        window.location.href = 'guestBook.html';
    } else {
        return false;
    }
}