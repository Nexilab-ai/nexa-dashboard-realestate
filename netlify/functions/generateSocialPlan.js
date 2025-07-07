const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const language = body.language === "english" ? "english" : "italian";

    let prompt = "";

    if (language === "italian") {
      prompt = `Crea un piano social personalizzato per promuovere una proprietà immobiliare. Inserisci i segnaposto per personalizzare i dettagli:

1. **Facebook**
- Testo: [Testo personalizzato Facebook]
- Hashtag: [Hashtag]
- Idea immagine: [Descrizione immagine]

2. **Instagram**
- Testo: [Testo personalizzato Instagram]
- Hashtag: [Hashtag]
- Idea immagine: [Descrizione immagine]

3. **LinkedIn**
- Testo: [Testo personalizzato LinkedIn]
- Hashtag: [Hashtag]
- Idea immagine: [Descrizione immagine]

4. **X (Twitter)**
- Testo: [Testo personalizzato Twitter]
- Hashtag: [Hashtag]
- Idea immagine: [Descrizione immagine]

5. **TikTok**
- Testo: [Testo personalizzato TikTok]
- Hashtag: [Hashtag]
- Idea video: [Descrizione video]

6. **YouTube Shorts**
- Testo: [Testo personalizzato YouTube Shorts]
- Hashtag: [Hashtag]
- Idea video: [Descrizione video]`;
    } else {
      prompt = `Create a customized social media plan to promote a real estate property. Include placeholders to personalize details:

1. **Facebook**
- Text: [Custom Facebook text]
- Hashtags: [Hashtags]
- Image idea: [Description]

2. **Instagram**
- Text: [Custom Instagram text]
- Hashtags: [Hashtags]
- Image idea: [Description]

3. **LinkedIn**
- Text: [Custom LinkedIn text]
- Hashtags: [Hashtags]
- Image idea: [Description]

4. **X (Twitter)**
- Text: [Custom Twitter text]
- Hashtags: [Hashtags]
- Image idea: [Description]

5. **TikTok**
- Text: [Custom TikTok text]
- Hashtags: [Hashtags]
- Video idea: [Description]

6. **YouTube Shorts**
- Text: [Custom YouTube Shorts text]
- Hashtags: [Hashtags]
- Video idea: [Description]`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: prompt }),
    };
  } catch (error) {
    console.error("Errore:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
