const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const propertyData = body.message || "No property details provided.";

    const prompt = `
Write a persuasive follow-up email to a lead interested in this property in ENGLISH and ITALIAN.

Include:
- Personalized greeting
- Summary of the property
- Invitation to book a viewing
- Contact information

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
          { role: "system", content: "You are an expert real estate email copywriter." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 600
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
