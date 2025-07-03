const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const propertyDetails = body.message || "[Property Features]";

    const prompt = `
Write an email in ENGLISH and ITALIAN to invite a potential buyer to schedule a viewing appointment for this property. 

Use a warm and professional tone.

Include placeholders for customization: 
- [Lead Name]
- [Property Address]
- [Phone Number]
- [Email Address]
- [Preferred Date]

Property details:
${propertyDetails}

Output format:

ENGLISH:
Subject: [Subject]
Body: [Body Text]

ITALIAN:
Oggetto: [Oggetto]
Corpo: [Testo Email]
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
            content: "You are a professional real estate copywriter.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
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
