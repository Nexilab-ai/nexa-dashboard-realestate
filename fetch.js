// Questo file è opzionale: serve solo se vuoi centralizzare le fetch API in moduli riutilizzabili
export async function fetchGptResponse(prompt) {
    const res = await fetch('/.netlify/functions/askgpt', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.reply;
}
