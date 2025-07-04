const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const prompt = `
Create a bilingual email template (English and Italian) for inviting a lead to schedule a viewing.

Include placeholders:
[Property Type], [Location], [Key Features], [Preferred Date], [Contact Name], [Phone], [Email].

Write the Italian version as an original, not a translation.

Format:

ENGLISH:
Subject:
[Subject text]

Body:
[Body text]

ITALIANO:
Oggetto:
[Subject text]

Corpo:
[Body text]
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
          { role: "system", content: "You are a professional real estate copywriter." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    const data = await response.json();
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
