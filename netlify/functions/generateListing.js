const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    // ✅ Gestisci eventuali richieste senza body
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No request body provided." }),
      };
    }

    const body = JSON.parse(event.body);
    const propertyData = body.message || "No property details provided.";

    const prompt = `
Write a professional real estate listing in ENGLISH and ITALIAN.

Include:
- Title
- Description
- Main features
- Call to action

Property details:
${propertyData}

Output format:

ENGLISH:
[English version]

ITALIAN:
[Italian version]
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
          {
            role: "system",
            content: "You are a professional real estate copywriter."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 700
      }),
    });

    const data = await response.json();

    // ✅ Se la risposta non contiene choices
    if (!data.choices || !data.choices[0]) {
      console.error("OpenAI API error response:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No valid response from OpenAI API." }),
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
