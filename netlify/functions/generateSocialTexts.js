const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "english";

    let prompt = "";

    if (lang === "english") {
      prompt = `Write 5 short captions to promote a property on social media. No call to action. Each caption should be different.`;
    } else {
      prompt = `Scrivi 5 brevi testi per promuovere un immobile sui social network. Non inserire call to action. Ogni testo deve essere diverso.`;
    }

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
          { role: "system", content: "You are a professional social media copywriter." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
