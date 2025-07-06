const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "italian";

    let prompt = "";

    if (lang === "english") {
      prompt = `
Write a professional real estate listing in English with placeholders:

[Area], we offer for sale [property type] located on [floor] of [building description]. The property has about [square meters] sqm and includes [main rooms]. Features: [highlights]. Accessories: [details]. Location: [main services]. Availability: [availability]. Price: €[price]. Contact: [phone] / [email].
`;
    } else {
      prompt = `
Scrivi un annuncio immobiliare professionale in italiano con segnaposto:

In [zona], proponiamo in vendita [tipologia immobile] situato al [piano] di [descrizione stabile]. La proprietà ha circa [metri quadri] mq e si compone di [ambienti principali]. Caratteristiche: [punti di forza]. Accessori: [dettagli]. Posizione: [servizi principali]. Disponibilità: [stato]. Prezzo: €[prezzo]. Contatti: [telefono] / [email].
`;
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
        temperature: 0.4,
        max_tokens: 600
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiMessage })
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
