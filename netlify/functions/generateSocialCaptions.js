const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const language = body.language === "english" ? "english" : "italian";

    let prompt = "";

    if (language === "italian") {
      prompt = `Crea 5 caption social pronte da personalizzare con segnaposto:

1. [Caption personalizzata 1]
2. [Caption personalizzata 2]
3. [Caption personalizzata 3]
4. [Caption personalizzata 4]
5. [Caption personalizzata 5]`;
    } else {
      prompt = `Create 5 customizable social captions with placeholders:

1. [Custom caption 1]
2. [Custom caption 2]
3. [Custom caption 3]
4. [Custom caption 4]
5. [Custom caption 5]`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: prompt }),
    };
  } catch (error) {
    console.error("Errore:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
