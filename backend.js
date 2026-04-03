// backend.js (Node.js)
const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

let key = 'your-secret-key-here';
let iv = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

app.use(express.static('public'));

function writeIP(ip) {
    const timestamp = new Date().toISOString();
    
    // Szyfrowanie adresu IP przy zapisywaniu do pliku:
    const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        Buffer.from(key, 'utf8'),
        iv
    );
    const encryptedData = cipher.update(ip, 'utf8', 'hex') + cipher.final('hex');
    
    // Zapisanie w formacie: timestamp | IP_encrypted\n
    fs.appendFileSync(
        'log.txt',
        `${timestamp} | ${encryptedData}\n`,
        { encoding: 'utf8' }
    );
}

// Odczyt z pliku i deszyfrowanie adresu IP:
function readAndDecryptIP() {
    try {
        const logContent = fs.readFileSync('log.txt', 'utf8');
        
        // Wyciągnij ostatni wpis (z poprzedniego dnia):
        const lines = logContent.split('\n').reverse();
        if (!lines.length) return;
        
        const lastLine = lines[0];
        const [timestamp, encryptedIP] = lastLine.trim().split(' | ');
        
        // Deszyfrowanie adresu IP:
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            Buffer.from(key, 'utf8'),
            iv
        );
        decipher.update(encryptedIP, 'hex', 'utf8');
        const decryptedIP = decipher.final('utf8');
        
        console.log(`Ostatni adres IP: ${decryptedIP}`);
    } catch (err) {
        console.error(err);
    }
}

// Ustawienie routingu do innej strony (bez wyświetlania adresu IP)
app.get('/redirect', (req, res) => {
    const ip = req.ip;
    
    // Zapisanie IP w pliku z szyfrowaniem
    writeIP(ip);
    
    // Przeniesienie na inną stronę bez informacji o adresie IP:
    res.redirect('https://www.google.com?nocache=' + Date.now());
});

// Uruchomienie serwera
app.listen(3000, () => console.log('Serwer działa na porcie 3000'));

// Automatyczne weryfikacja i deszyfrowanie adresu IP:
setInterval(readAndDecryptIP, 24 * 60 * 60 * 1000); // dziennie

