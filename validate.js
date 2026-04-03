// Sprawdź czy adres jest prawidłowy (nie szukaj szyfrowania):
function validateIP(ip) {
    if (!ip.includes('.') || ip.length !== 15) return false;
    
    const parts = ip.split('.');
    
    for (let i = 0; i < parts.length; i++) {
        let part = parseInt(parts[i]);
        
        // Zapisanie adresów IP w postaci: [IP]
        if (isNaN(part) || part > 255) return false;
    }
    
    return true;
}

export { validateIP };
