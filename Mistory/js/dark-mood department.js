document.addEventListener("DOMContentLoaded", function() {
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const circle = document.getElementById("circle");
    const textElement = document.getElementById("text");

    // 초기 로컬 스토리지 값에 따라 다크 모드 설정
    const currentMode = localStorage.getItem("darkMode");
    if (currentMode === "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // 다크 모드 토글 버튼 클릭 이벤트 처리
    toggleDarkMode.addEventListener("click", function() {
        if (document.body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // 다크 모드 활성화 함수
    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        textElement.style.display = "block"; // 밝은 모드에서는 #text 요소를 보임
        showCircle();
    }
    
    // 다크 모드 비활성화 함수
    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        textElement.style.display = "none"; // 다크 모드에서는 #text 요소를 숨김
        hideCircle();
    }

    // 다크 모드일 때 원 모양 요소를 화면에 표시하고 마우스 이동 이벤트 처리
    function showCircle() {
        circle.style.display = "block";
        document.addEventListener("mousemove", moveCircle);
    }

    // 다크 모드가 아닐 때 원 모양 요소를 숨기고 마우스 이동 이벤트 해제
    function hideCircle() {
        circle.style.display = "none";
        document.removeEventListener("mousemove", moveCircle);
    }

    // 마우스 이동 시 원 모양 요소 위치 조정
    function moveCircle(event) {
        circle.style.left = event.pageX - circle.offsetWidth / 2 + "px";
        circle.style.top = event.pageY - circle.offsetHeight / 2 + "px";
    }
});
