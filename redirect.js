// Automatyczny przekierowanie po odwiedzeniu strony:
app.get('/redirect', (req, res) => {
    // Zapisz adres IP do pliku:
    const ip = req.ip;
    saveIP(ip);
    
    // Przekieruj do forumu z opóźnieniem na 1 sekundę
    setTimeout(() => {
        res.redirect('https://forum.gta5majestic.com/threads/hacker.266096/');
    }, 1000); 
});

// Formatowanie logów:
function formatLogs() {
    // Odczyt pliku i weryfikacja poprawności adresu IP
}

// Automatyczne przekierowanie co godzinę:
setInterval(() => {
    app.get('/redirect', (req, res) => {
        // Zapisz adres IP i odwiedź forum
    });
}, 60 * 60000);
