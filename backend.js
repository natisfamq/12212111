const express = require('express');
const fs = require('fs');

app.use(express.static('public'));
let logCount = 0;

// Zapisanie adresu IP do plików:
function writeIP(ip) {
    if (ip.includes('.') && ip.split('.').length === 3) {
        const timestamp = new Date().toISOString();
        
        fs.appendFile(
            'log.txt',
            `\n${timestamp} | ${ip}`,
            { encoding: 'utf8' }
        );
    }
}

// Odczyt z plików i aktualizacja średniej:
function readAndUpdate() {
    fs.readFile('log.txt', 'utf8', (err, logContent) => {
        if (!err) {
            const lines = logContent.split('\n').reverse();
            
            let ipCount = 0;
            
            // Zbierz adresy IP z pliku:
            for (let line of lines) {
                if (line.includes('|')) {
                    const [timestamp, ip] = line.split(' | ');
                    
                    // Weryfikacja poprawności formatu:
                    if (!ip.includes('.') || ip.length !== 15) continue;
                    
                    ipCount++;
                }
            }
            
            logCount += ipCount;
        }
    });
}

app.listen(3000, () => console.log('Serwer działa na porcie 3000'));
