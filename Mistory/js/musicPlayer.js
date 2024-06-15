// HTML 오디오 요소를 가져옵니다.
const audioPlayer = document.getElementById('audioPlayer');
const saveStateButton = document.getElementById('saveState');
const clearStateButton = document.getElementById('clearState');

// 오디오 상태를 로컬 스토리지에 저장하는 함수
function saveAudioState() {
    const currentTime = audioPlayer.currentTime;
    const isPlaying = !audioPlayer.paused;

    localStorage.setItem('audioCurrentTime', currentTime);
    localStorage.setItem('audioIsPlaying', isPlaying);
}

// 페이지가 로드될 때 오디오 상태를 복원하는 함수
function loadAudioState() {
    const savedTime = localStorage.getItem('audioCurrentTime');
    const savedIsPlaying = localStorage.getItem('audioIsPlaying');

    if (savedTime !== null) {
        audioPlayer.currentTime = parseFloat(savedTime);
    }

    if (savedIsPlaying === 'true') {
        audioPlayer.play();
    }
}

// 페이지를 떠날 때 오디오 상태를 저장
window.addEventListener('beforeunload', saveAudioState);

// 페이지가 로드될 때 오디오 상태를 로드
window.addEventListener('load', loadAudioState);

// 버튼을 눌렀을 때 오디오 상태를 저장
saveStateButton.addEventListener('click', saveAudioState);

// 저장된 오디오 상태를 지우는 버튼
clearStateButton.addEventListener('click', () => {
    localStorage.removeItem('audioCurrentTime');
    localStorage.removeItem('audioIsPlaying');
});

// 오디오 재생/일시정지 상태가 변경될 때마다 상태를 저장
audioPlayer.addEventListener('play', saveAudioState);
audioPlayer.addEventListener('pause', saveAudioState);

