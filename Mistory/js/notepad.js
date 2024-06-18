$(document).ready(function(){
    // 메모장을 토글하는 함수
    function toggleMemo() {
        $('#memoContainer').toggle();
    }

    // 'm' 키를 누를 때 메모장을 토글
    $(document).on('keydown', function(event) {
        if (event.key === 'm') {
            toggleMemo();
        }
    });

    // 닫기 버튼 클릭 시 메모장 닫기
    $('#closeMemoBtn').click(function() {
        $('#memoContainer').hide();
        saveMemo(); // 메모를 닫을 때 저장
    });

    // 페이지 로드 시 저장된 메모 불러오기
    loadMemo();

    // 메모를 로컬 스토리지에 저장하는 함수
    function saveMemo() {
        var memoText = $('#memoTextarea').val();
        localStorage.setItem('memo', memoText);
    }

    // 로컬 스토리지에서 메모를 불러와 textarea에 채우는 함수
    function loadMemo() {
        var memo = localStorage.getItem('memo');
        if (memo) {
            $('#memoTextarea').val(memo);
        }
    }

    // 메모장을 드래그할 수 있게 하는 코드
    var isDragging = false;
    var initialX, initialY;
    var xOffset = 0, yOffset = 0;
    var memoWidth, memoHeight;

    $('#memoContainer').mousedown(function(e) {
        isDragging = true;
        var memoOffset = $(this).offset();
        memoWidth = $(this).outerWidth();
        memoHeight = $(this).outerHeight();
        
        initialX = e.clientX - memoOffset.left;
        initialY = e.clientY - memoOffset.top;
    });

    $(document).mousemove(function(e) {
        if (isDragging) {
            var newX = e.clientX - initialX;
            var newY = e.clientY - initialY;

            var maxX = $(window).width() - memoWidth;
            var maxY = $(window).height() - memoHeight;

            newX = Math.min(Math.max(0, newX), maxX);
            newY = Math.min(Math.max(0, newY), maxY);

            $('#memoContainer').css({
                'top': newY + 'px',
                'left': newX + 'px'
            });
        }
    });

    $(document).mouseup(function() {
        isDragging = false;
    });

});
