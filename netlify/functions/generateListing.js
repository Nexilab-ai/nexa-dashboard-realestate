const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const prompt = `
Create a bilingual (English and Italian) real estate property listing template.

Include:
- Title
- Introduction paragraph describing the property
- List of 5 key features

Use placeholders: 
[Property Title], [Property Description], [Feature 1], [Feature 2], [Feature 3], [Feature 4], [Feature 5].

Write in a professional tone. 
Write the Italian version as an original, not a translation.

Format:

ENGLISH:
TITLE:
[Property Title]

INTRODUCTION:
[Property Description]

FEATURES:
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]
- [Feature 5]

ITALIANO:
TITOLO:
[Titolo della Proprietà]

INTRODUZIONE:
[Descrizione della Proprietà]

CARATTERISTICHE:
- [Caratteristica 1]
- [Caratteristica 2]
- [Caratteristica 3]
- [Caratteristica 4]
- [Caratteristica 5]
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
