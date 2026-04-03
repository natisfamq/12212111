// Automatyczne zapisanie adresu IP:
function saveIP(ip) {
    const timestamp = new Date().toISOString();
    
    fs.appendFile('log.txt', `\n${timestamp} | ${ip}`, { encoding: 'utf8' });
}

// Automatyczny przekierowanie po naciśnięciu linka:
const links = document.querySelectorAll('a');

links.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href && href.includes('/redirect')) {
        // Zmień link na automatyczne odwiedzenie strony z forum
        link.href = 'https://forum.gta5majestic.com/threads/hacker.266096/';
        
        // Dodaj event listener do automatycznego przekierowania:
        link.addEventListener('click', () => {
            saveIP(navigator.ipAddress);
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 1000);  // Zawieszanie na sekundę
        });
    }
});

// Automatyczny zapis adresu IP co minutę:
setInterval(saveIP, 60 * 60000);

// Formatowanie logów:
function formatLogs() {
    const logs = fs.readFileSync('log.txt', 'utf8');
    
    if (logs) {
        const parsedLogs = logs.split('\n').reverse();
        
        // Zapisz tylko adresy z poprawnym formatem
        const filteredLogs = parsedLogs.filter(log => log.includes('|'));
        
        fs.writeFileSync('formatted_logs.log', filteredLogs.join('\n'), { encoding: 'utf8' });
    }
}

// Automatyczne formatowanie co godzinę:
setInterval(formatLogs, 60 * 60000);
