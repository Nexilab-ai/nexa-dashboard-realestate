const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const prompt = `
Write a short property presentation in English and Italian.
Use an elegant, natural tone without "Call to Action".
Include placeholders:
[Property Title], [Property Features], [Property Location].
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
          { role: "system", content: "You are a real estate marketing expert." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 500,
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
