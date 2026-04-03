// Sprawdź adres IP co 15 minut:
setInterval(() => {
    readAndUpdate();
}, 900 * 1000); 

// Usuń stare rekordy co godzinę:
setInterval(cleanLog, 60 * 60 * 1000);
