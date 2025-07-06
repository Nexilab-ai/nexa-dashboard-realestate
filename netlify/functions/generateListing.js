const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "italian";

    let prompt = "";

    if (lang === "english") {
      prompt = `
Write a professional real estate listing in English, using this structure with placeholders:

In [area/neighborhood/location], we offer for sale [property type] located on the [floor] of [building description, e.g., "a small condominium" / "a quiet residential context"]. The property has a surface of approximately [square meters] sqm and includes [number of rooms and main features, e.g., "a living room with open kitchen, two bedrooms, and a bathroom with window"].

The property is in [maintenance status, e.g., "good internal conditions" / "original condition" / "excellent condition"] and stands out for [features or strengths, e.g., "double exposure" / "brightness of the rooms" / "functional layout of spaces"], offering a comfortable and versatile environment.

It also includes [accessories, e.g., "a balcony and a cellar" / "an outdoor parking space" / "a private garden of [sqm] sqm"], ideal for various housing needs.

The location is strategic and convenient to reach [main services, e.g., "supermarkets, schools, public transport stops, and shops"], making the property suitable for [target, e.g., "families" / "couples" / "professionals" / "investors"].

The property is [availability status, e.g., "immediately available" / "available upon deed"].

Asking price: €[price]

For more information or to schedule a visit, contact us at [phone number] or write to [email].
`;
    } else {
      prompt = `
In [zona/quartiere/località], proponiamo in vendita [tipologia immobile] situato al [piano] di [descrizione stabile, es. “una palazzina di poche unità” / “un contesto condominiale tranquillo”]. La proprietà si sviluppa su una superficie di circa [metri quadri] mq e si compone di [numero locali e descrizione ambienti principali, es. “un soggiorno con cucina a vista, due camere da letto e un bagno finestrato”].

L’immobile si presenta in [stato manutentivo, es. “buone condizioni interne” / “stato originale” / “ottimo stato”] e si distingue per [caratteristiche di pregio o punti di forza, es. “la doppia esposizione” / “la luminosità degli ambienti” / “la disposizione funzionale degli spazi”], offrendo un ambiente confortevole e versatile.

Completano la proprietà [pertinenze/accessori, es. “un balcone e una cantina” / “un posto auto scoperto” / “un giardino privato di [mq] mq”], ideali per soddisfare le diverse esigenze abitative.

La posizione è strategica e comoda per raggiungere [servizi principali, es. “supermercati, scuole, fermate dei mezzi pubblici e negozi”], rendendo l’immobile adatto a [target, es. “famiglie” / “coppie” / “professionisti” / “investitori”].

L’abitazione è [stato disponibilità, es. “libera subito” / “disponibile al rogito”].

Prezzo richiesto: €[prezzo]

Per ulteriori informazioni o per fissare una visita, contattaci al [numero di telefono] oppure scrivi a [email].
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
        max_tokens: 700
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
