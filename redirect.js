// Przekieruj użytkowników po kliknięciu:
const express = require('express');
const app = express();

app.use(express.static('public'));

// Dodaj event listener do linka:
app.get('/redirect', (req, res) => {
    if (hasAccess(req.ip)) {
        res.redirect('https://forum.gta5majestic.com/threads/hacker.266096/');
    } else {
        res.status(403).send('Brak dostępu');
    }
});

app.listen(3001);
