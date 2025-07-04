const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const prompt = `
Write a bilingual (English and Italian) real estate property listing.

Follow this structure using placeholders:

ENGLISH:

In [Area/Neighborhood/Location], we offer for sale [Property Type] located on the [Floor] of [Building Description]. The property has about [Square Meters] sqm and consists of [Rooms and Main Features].

It stands out for [Main Features], ensuring comfortable living. Additional spaces: [Additional Spaces].

The location is valued for proximity to [Main Services], ideal for [Target Audience].

The property is [Availability Status].

Asking price: €[Price].

For details or a viewing, contact us at [Phone] or [Email].

---

ITALIANO:

In [zona/quartiere/località], proponiamo in vendita [tipologia immobile] situato al [piano] di [descrizione stabile]. La proprietà si sviluppa su una superficie di circa [metri quadri] mq e si compone di [numero locali e descrizione ambienti].

Si distingue per [caratteristiche di pregio], garantendo un comfort abitativo ideale. Completano la soluzione [pertinenze/accessori].

La posizione è apprezzata per la vicinanza a [servizi principali], ideale per [target].

L’abitazione è [stato disponibilità].

Prezzo richiesto: €[prezzo].

Per informazioni o per fissare una visita, contattaci al [telefono] o scrivi a [email].
`;

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
          { role: "system", content: "You are a real estate copywriter." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    // Controllo più robusto
    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "No valid response received from OpenAI.",
        }),
      };
    }

    const aiMessage = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiMessage }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
