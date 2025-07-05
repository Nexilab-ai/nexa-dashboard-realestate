const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "english";

    let prompt = "";

    if (lang === "english") {
      prompt = `Write a professional real estate listing in English with placeholders.

In [Area], we offer for sale [Property Type] located on [Floor] of [Building Description, e.g., "a quiet condominium" / "a small building"]. The property has about [Square Meters] sqm and includes [Rooms Description, e.g., "a bright living room with balcony access, separate kitchen, two bedrooms, and a windowed bathroom"]. Key features: [Highlights, e.g., "good space distribution and excellent sun exposure"]. Accessories: [e.g., "private cellar and garage"]. Location: near [Main Services]. Availability: [Availability Status]. Price: €[Price]. Contact: [Phone] or [Email].`;
    } else {
      prompt = `Scrivi un annuncio immobiliare professionale in italiano con segnaposto.

In [Zona], proponiamo in vendita [Tipologia immobile] situato al [Piano] di [Descrizione stabile, es. "un tranquillo contesto condominiale"]. La proprietà si sviluppa su una superficie di circa [Metri quadri] mq e si compone di [Descrizione ambienti principali, es. "un luminoso soggiorno con accesso al balcone, cucina separata, due camere da letto e un bagno finestrato"]. Caratteristiche principali: [Punti di forza, es. "la buona distribuzione degli spazi e l'ottima esposizione solare"]. Accessori: [Es. "una cantina di proprietà e un box auto"]. Posizione: vicina a [Servizi principali]. Disponibilità: [Stato disponibilità]. Prezzo richiesto: €[Prezzo]. Contatti: [Telefono] o [Email].`;
    }

    const apiKey = process.env.NEXA_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional real estate copywriter." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 800
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiMessage }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
