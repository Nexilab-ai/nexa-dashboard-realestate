const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "english";

    let prompt = "";

    if (lang === "english") {
      prompt = "Test prompt in English.";
    } else {
      prompt = "Prompt di test in Italiano.";
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
          { role: "system", content: "You are a professional copywriter." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 100
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error("Empty response from API");
    }

    console.log("API response raw:", text);

    const data = JSON.parse(text);

    if (!data.choices || !data.choices[0]) {
      throw new Error("No choices returned in API response");
    }

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
