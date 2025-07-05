const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "english";

    let prompt = "";

    if (lang === "english") {
      prompt = `Write a brochure text for a luxury property with placeholders. Include:

- Title
- Description
- Key Features
- Contact Information.`;
    } else {
      prompt = `Scrivi un testo per una brochure di un immobile di prestigio, con segnaposto. Includi:

- Titolo
- Descrizione
- Caratteristiche principali
- Informazioni di contatto.`;
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
        max_tokens: 700
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
