const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const prompt = `
Create an English and Italian property listing for a luxury property.
Use a natural, elegant style without "Call to Action".

Include:
- Title
- Introduction
- Key Features (bullet points)

Use [Property Title], [Property Features], [Property Location] as placeholders.
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
        temperature: 0.5,
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
