document.addEventListener("DOMContentLoaded", function() {
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const circle = document.getElementById("circle");

    const currentMode = localStorage.getItem("darkMode");
    if (currentMode === "enabled") {
        document.body.classList.add("dark-mode");
        showCircle();
    } else if (currentMode === "disabled") {
        document.body.classList.remove("dark-mode");
    }

    toggleDarkMode.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode"); // Toggle dark mode class on body
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            showCircle();
        } else {
            localStorage.setItem("darkMode", "disabled");
            hideCircle();
        }
    });

    function showCircle() {
        circle.style.display = "block";
        document.addEventListener("mousemove", moveCircle);
    }

    function hideCircle() {
        circle.style.display = "none";
        document.removeEventListener("mousemove", moveCircle);
    }

    function moveCircle(event) {
        circle.style.left = event.pageX - circle.offsetWidth / 2 + "px";
        circle.style.top = event.pageY - circle.offsetHeight / 2 + "px";
    }
});
