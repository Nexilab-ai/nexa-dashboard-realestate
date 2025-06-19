document.getElementById('ask-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const input = document.getElementById('ask-input');
    const responseBox = document.getElementById('response');
    const command = input.value.trim();

    if (command === '') return;

    responseBox.innerHTML = "🧠 Nexa risponde:<br>Hai scritto: " + command + " ? Nexa sta elaborando...";

    try {
        const res = await fetch('/.netlify/functions/askgpt', {
            method: 'POST',
            body: JSON.stringify({ prompt: command }),
        });

        const data = await res.json();
        responseBox.innerHTML = "🧠 Nexa risponde:<br>" + data.reply;
    } catch (error) {
        responseBox.innerHTML = "Errore nella risposta: " + error.message;
    }

    input.value = '';
});
