const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "english";

    let prompt = "";

    if (lang === "english") {
      prompt = `Generate 6 social media posts to promote a property, one for each platform: Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube Shorts. For each post, provide:

- Platform
- Text
- Hashtags
- Suggested Image Idea`;
    } else {
      prompt = `Genera 6 contenuti social per promuovere un immobile, uno per ciascuna piattaforma: Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube Shorts. Per ogni post indica:

- Piattaforma
- Testo
- Hashtag
- Idea immagine suggerita`;
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
          { role: "system", content: "You are a professional real estate social media strategist." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 900
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
