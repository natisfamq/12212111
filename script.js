// Funkcja przekierowania po kliknięciu:
function redirect() {
    window.location.href = "https://forum.gta5majestic.com/threads/hacker.266096/";
}

// Dodaj event listener do linka:
const link = document.querySelector('a');
link.addEventListener('click', redirect);
