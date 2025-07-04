const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const prompt = `
Create a bilingual property brochure content template (English and Italian).

Include placeholders:
[Property Title], [Property Description], [Key Features], [Contact Information].

Write in a neutral, elegant tone. 
Write Italian version as an original.

Format:

ENGLISH:
TITLE:
[Property Title]

DESCRIPTION:
[Property Description]

FEATURES:
- [Feature 1]
- [Feature 2]
- [Feature 3]

CONTACT:
[Contact Information]

ITALIANO:
TITOLO:
[Titolo della Proprietà]

DESCRIZIONE:
[Descrizione della Proprietà]

CARATTERISTICHE:
- [Caratteristica 1]
- [Caratteristica 2]
- [Caratteristica 3]

CONTATTI:
[Informazioni di Contatto]
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
        temperature: 0.4,
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
