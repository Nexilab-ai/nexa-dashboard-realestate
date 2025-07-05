const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const lang = body.language || "italian";

    const prompt = "Test di connessione. Rispondi con una frase breve.";

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
          { role: "system", content: "Sei un assistente immobiliare professionale." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 100
      }),
    });

    const raw = await response.text();
    console.log("RAW RESPONSE:", raw);

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${raw}`);
    }

    const data = JSON.parse(raw);

    if (!data.choices || !data.choices[0]) {
      throw new Error("No choices returned");
    }

    const aiMessage = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiMessage }),
    };

  } catch (error) {
    console.error("ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
