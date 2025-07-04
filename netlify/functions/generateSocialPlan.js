const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const prompt = `
Create a 5-day social media content plan for a property.
Write in English first, then Italian.
Do not mix languages. No "Call to Action".

Use placeholders:
[Property Title], [Property Features].

Format:
ENGLISH:
Day 1:
...
Day 5:

ITALIAN:
Day 1:
...
Day 5:
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
          { role: "system", content: "You are a social media strategist." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 700,
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
