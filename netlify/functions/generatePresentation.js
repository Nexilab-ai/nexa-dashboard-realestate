const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const propertyData = body.message || "No property details provided.";

    const prompt = `
Write a persuasive presentation text in ENGLISH and ITALIAN to convince the property owner to assign the sale to the agency.

Include:
- Welcome
- Main selling points of the agency
- Benefits of exclusive mandate
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
          { role: "system", content: "You are a real estate sales presentation expert." },
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
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
